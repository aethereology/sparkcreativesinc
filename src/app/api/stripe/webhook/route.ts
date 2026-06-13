import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { sendDonationReceipt } from "@/lib/resend";
import { designationLabel } from "@/content/donation";

/**
 * Stripe webhook. Verifies the signature with STRIPE_WEBHOOK_SECRET, then sends
 * a donation receipt via Resend on checkout.session.completed.
 * Reads the raw request body (required for signature verification).
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    console.error("[stripe] webhook missing configuration");
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe] webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const eventId = event.id ?? "unknown";
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email;
    const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: (session.currency ?? "usd").toUpperCase(),
    });
    const designation = designationLabel(session.metadata?.designation ?? "general");

    if (email) {
      const receiptResult = await sendDonationReceipt({ to: email, amount, designation });
      if (!receiptResult.ok) {
        console.error(
          `[stripe] webhook ${eventId} receipt failed for ${email} | amount=${amount} designation=${designation}`,
        );
        return NextResponse.json(
          { error: "Failed to send donation receipt." },
          { status: 500 },
        );
      }
      if (receiptResult.skipped) {
        console.warn(`[stripe] webhook ${eventId} donation receipt skipped because Resend is not configured.`);
      }
    } else {
      console.warn(`[stripe] webhook ${eventId} has no customer email; receipt skipped.`);
    }
  }

  return NextResponse.json({ received: true, configured: true });
}
