import { Resend } from "resend";
import { org } from "@/content/org";
import {
  renderContactAutoReply,
  renderContactNotification,
  renderDonationReceipt,
} from "@/lib/email-templates";

/**
 * Email via Resend. Lazy + graceful: if RESEND_API_KEY is missing we log and
 * no-op instead of throwing, so contact/donation flows still complete in dev.
 */
let cached: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cached) cached = new Resend(key);
  return cached;
}

// Sender identity (leadership confirmed 2026-06-10): ignite@sparkcreativesinc.org,
// DKIM-signed via Resend; replies route to the M365 inbox behind the alias.
const FROM = process.env.RESEND_FROM ?? `SparkCreatives <onboarding@resend.dev>`;
const TO_INBOX = process.env.CONTACT_INBOX ?? org.email;

export async function sendContactEmail(input: {
  name: string;
  email: string;
  organization?: string;
  inquiryType: string;
  message: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  const resend = getResend();
  const { subject, html, text } = renderContactNotification(input);

  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — contact email skipped.\n" + text);
    return { ok: true, skipped: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO_INBOX,
    replyTo: input.email,
    subject,
    html,
    text,
  });
  if (error) {
    console.error("[resend] send failed:", error);
    return { ok: false };
  }
  return { ok: true };
}

/**
 * Auto-reply sent back to whoever submitted the contact form. Best-effort:
 * callers should not fail the submission if this doesn't send.
 */
export async function sendContactAutoReply(input: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  const resend = getResend();
  const { subject, html, text } = renderContactAutoReply(input);

  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — contact auto-reply skipped.");
    return { ok: true, skipped: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: input.email,
    replyTo: TO_INBOX,
    subject,
    html,
    text,
  });
  if (error) {
    console.error("[resend] auto-reply failed:", error);
    return { ok: false };
  }
  return { ok: true };
}

export async function sendDonationReceipt(input: {
  to: string;
  amount: string;
  designation: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  const resend = getResend();
  const { subject, html, text } = renderDonationReceipt({
    amount: input.amount,
    designation: input.designation,
  });

  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — donation receipt skipped.\n" + text);
    return { ok: true, skipped: true };
  }
  const { error } = await resend.emails.send({
    from: FROM,
    to: input.to,
    subject,
    html,
    text,
  });
  if (error) {
    console.error("[resend] receipt failed:", error);
    return { ok: false };
  }
  return { ok: true };
}
