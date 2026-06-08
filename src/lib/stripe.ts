import Stripe from "stripe";

/**
 * Server-side Stripe client. Built lazily so the app runs (and builds) without
 * keys — donation flow stays in a friendly "not configured" state until
 * STRIPE_SECRET_KEY (test or live) is added to .env.local.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);
