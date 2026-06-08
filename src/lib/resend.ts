import { Resend } from "resend";
import { org } from "@/content/org";

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

// TODO: leadership confirm verified sending domain/address in Resend.
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
  const subject = `New ${input.inquiryType} inquiry from ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.organization ? `Organization: ${input.organization}` : null,
    `Inquiry type: ${input.inquiryType}`,
    "",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — contact email skipped.\n" + text);
    return { ok: true, skipped: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO_INBOX,
    replyTo: input.email,
    subject,
    text,
  });
  if (error) {
    console.error("[resend] send failed:", error);
    return { ok: false };
  }
  return { ok: true };
}

export async function sendDonationReceipt(input: {
  to: string;
  amount: string;
  designation: string;
}): Promise<void> {
  const resend = getResend();
  const text =
    `Thank you for your gift of ${input.amount} to ${org.name}.\n\n` +
    `Designation: ${input.designation}\n\n` +
    `Your support helps turn surplus into opportunity.\n` +
    `TODO: leadership confirm official receipt and tax-acknowledgment language.`;

  if (!resend) {
    console.warn("[resend] RESEND_API_KEY not set — donation receipt skipped.\n" + text);
    return;
  }
  const { error } = await resend.emails.send({
    from: FROM,
    to: input.to,
    subject: `Your donation to ${org.name}`,
    text,
  });
  if (error) console.error("[resend] receipt failed:", error);
}
