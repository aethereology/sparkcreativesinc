import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { designationLabel, minAmount, maxAmount } from "@/content/donation";
import { org } from "@/content/org";
import { SITE_URL } from "@/lib/utils";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    // Test mode not configured yet — tell the client gracefully.
    return NextResponse.json(
      {
        configured: false,
        message:
          "Donations aren't connected yet. Add STRIPE_SECRET_KEY to enable checkout.",
      },
      { status: 200 },
    );
  }

  let body: { amount?: number; frequency?: string; designation?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  const frequency = body.frequency === "monthly" ? "monthly" : "one-time";
  const designation = String(body.designation ?? "general");

  if (!Number.isFinite(amount) || amount < minAmount || amount > maxAmount) {
    return NextResponse.json(
      { error: `Please enter an amount between $${minAmount} and $${maxAmount}.` },
      { status: 400 },
    );
  }

  const originHeader = request.headers.get("origin");
  const origin = originHeader &&
    (originHeader === SITE_URL || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(originHeader))
    ? originHeader
    : SITE_URL;
  const label = designationLabel(designation);
  const isMonthly = frequency === "monthly";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isMonthly ? "subscription" : "payment",
      submit_type: isMonthly ? undefined : "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            ...(isMonthly ? { recurring: { interval: "month" as const } } : {}),
            product_data: {
              name: `Donation to ${org.name}`,
              description: `Designation: ${label}${isMonthly ? " (monthly)" : ""}`,
            },
          },
        },
      ],
      metadata: { designation, frequency, amount: String(amount) },
      success_url: `${origin}/thank-you?type=donation`,
      cancel_url: `${origin}/donate?canceled=1`,
    });

    return NextResponse.json({ configured: true, url: session.url });
  } catch (err) {
    console.error("[stripe] checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
