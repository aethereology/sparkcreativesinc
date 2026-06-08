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
    return NextResponse.json({ received: true, configured: false });
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email;
    const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: (session.currency ?? "usd").toUpperCase(),
    });
    const designation = designationLabel(session.metadata?.designation ?? "general");

    if (email) {
      await sendDonationReceipt({ to: email, amount, designation });
    }
  }

  return NextResponse.json({ received: true });
}
