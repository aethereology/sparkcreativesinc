"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import { initialContactState, type ContactState } from "@/app/contact/contact-state";
import { useFormStatus } from "react-dom";

const INQUIRY_TYPES = [
  "Donation",
  "Volunteer",
  "Partnership",
  "Host a Spark Lab",
  "Donate goods",
  "General",
] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        "Send message"
      )}
    </button>
  );
}

function Field({
  label,
  error,
  children,
  required,
  hint,
}: {
  label: string;
  error?: string;
  children: (props: { id: string; describedBy?: string }) => React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      <div className="mt-1.5">{children({ id, describedBy })}</div>
      {error ? (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink placeholder:text-ink-faint focus:ring-2 focus:ring-ring focus:outline-none";

export function ContactForm({ defaultInquiry }: { defaultInquiry?: string }) {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );
  const summaryRef = useRef<HTMLDivElement>(null);

  // Move focus to the status summary after a submit attempt (success or error).
  useEffect(() => {
    if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  const initialType = INQUIRY_TYPES.find(
    (t) => t.toLowerCase().replace(/\s+/g, "-") === defaultInquiry,
  );

  if (state.status === "success") {
    return (
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-border bg-surface p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-semibold">Message sent</h3>
        <p className="mt-2 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      {state.status === "error" && state.message ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={state.errors.name} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-describedby={describedBy}
              aria-invalid={state.errors.name ? true : undefined}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Email" error={state.errors.email} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby={describedBy}
              aria-invalid={state.errors.email ? true : undefined}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Organization" hint="Optional">
          {({ id, describedBy }) => (
            <input
              id={id}
              name="organization"
              type="text"
              autoComplete="organization"
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="What's this about?" error={state.errors.inquiryType} required>
          {({ id, describedBy }) => (
            <select
              id={id}
              name="inquiryType"
              required
              defaultValue={initialType ?? ""}
              aria-describedby={describedBy}
              aria-invalid={state.errors.inquiryType ? true : undefined}
              className={inputClass}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={state.errors.message} required>
          {({ id, describedBy }) => (
            <textarea
              id={id}
              name="message"
              rows={5}
              required
              aria-describedby={describedBy}
              aria-invalid={state.errors.message ? true : undefined}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      {/* Honeypot (hidden from users) */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
