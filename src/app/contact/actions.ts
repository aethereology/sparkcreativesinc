"use server";

import { headers } from "next/headers";
import { getContactRateLimitStatus, recordContactSubmission } from "@/lib/rate-limit";
import { sendContactAutoReply, sendContactEmail } from "@/lib/resend";
import type { ContactState } from "./contact-state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields; humans don't.
  if ((formData.get("company_website") as string)?.trim()) {
    return { status: "success", message: "Thanks — your message is on its way.", errors: {} };
  }

  const name = (formData.get("name") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const organization = (formData.get("organization") as string)?.trim() ?? "";
  const inquiryType = (formData.get("inquiryType") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";
  const renderedAt = Number(formData.get("formRenderedAt") as string) || 0;

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 200) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 254) errors.email = "Email is too long.";

  if (organization.length > 200) errors.organization = "Organization name is too long.";

  if (!inquiryType) errors.inquiryType = "Please choose what your message is about.";
  if (!message || message.length < 10)
    errors.message = "Please share a little more (at least 10 characters).";
  else if (message.length > 5000)
    errors.message = "Message is too long. Please keep it under 5000 characters.";

  if (renderedAt && Date.now() - renderedAt < 3000) {
    console.warn("[contact] form submitted too quickly — likely bot activity.");
    return { status: "success", message: "Thanks — your message is on its way.", errors: {} };
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const requestHeaders = await headers();
  const rateStatus = getContactRateLimitStatus(requestHeaders);
  if (!rateStatus.allowed) {
    return {
      status: "error",
      message: "Please wait a few minutes before sending another message.",
      errors: {},
    };
  }

  recordContactSubmission(requestHeaders);
  const result = await sendContactEmail({ name, email, organization, inquiryType, message });
  if (!result.ok) {
    return {
      status: "error",
      message: "Sorry — we couldn't send your message. Please email us directly.",
      errors: {},
    };
  }

  // Best-effort acknowledgment to the sender — never fail the submission if it
  // doesn't send (the team notification above is what matters).
  try {
    await sendContactAutoReply({ name, email, inquiryType, message });
  } catch (err) {
    console.error("[contact] auto-reply threw:", err);
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. We'll be in touch soon.",
    errors: {},
  };
}
