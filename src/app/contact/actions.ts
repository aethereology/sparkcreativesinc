"use server";

import { sendContactEmail } from "@/lib/resend";
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

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!inquiryType) errors.inquiryType = "Please choose what your message is about.";
  if (!message || message.length < 10)
    errors.message = "Please share a little more (at least 10 characters).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const result = await sendContactEmail({ name, email, organization, inquiryType, message });
  if (!result.ok) {
    return {
      status: "error",
      message: "Sorry — we couldn't send your message. Please email us directly.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. We'll be in touch soon.",
    errors: {},
  };
}
