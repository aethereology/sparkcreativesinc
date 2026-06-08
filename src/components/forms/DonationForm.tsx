"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import {
  presetAmounts,
  amountHints,
  designations,
  minAmount,
  maxAmount,
} from "@/content/donation";
import { cn } from "@/lib/utils";

export function DonationForm({ initialDesignation }: { initialDesignation?: string }) {
  const validInitial = designations.some((d) => d.id === initialDesignation)
    ? (initialDesignation as string)
    : "general";

  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [designation, setDesignation] = useState(validInitial);
  const [preset, setPreset] = useState<number | null>(150);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const amount = preset ?? Number(custom);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!Number.isFinite(amount) || amount < minAmount || amount > maxAmount) {
      setMessage(`Please choose or enter an amount between $${minAmount} and $${maxAmount}.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency, designation }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
        return;
      }
      setMessage(
        data.message ??
          data.error ??
          "Donations aren't connected yet. Please check back soon.",
      );
    } catch {
      setMessage("Something went wrong starting checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      {/* Frequency */}
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Frequency</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-muted p-1">
          {(["one-time", "monthly"] as const).map((f) => (
            <label
              key={f}
              className={cn(
                "cursor-pointer rounded-sm px-3 py-2 text-center text-sm font-medium transition-colors",
                frequency === f ? "bg-surface text-ink shadow-sm" : "text-ink-soft",
              )}
            >
              <input
                type="radio"
                name="frequency"
                value={f}
                checked={frequency === f}
                onChange={() => setFrequency(f)}
                className="sr-only"
              />
              {f === "one-time" ? "One-time" : "Monthly"}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Designation */}
      <div className="mt-6">
        <label htmlFor="designation" className="text-sm font-semibold text-ink">
          Direct my gift to
        </label>
        <select
          id="designation"
          name="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="mt-2 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-ink"
        >
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-ink">Amount (USD)</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {presetAmounts.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={preset === a}
              onClick={() => {
                setPreset(a);
                setCustom("");
              }}
              className={cn(
                "min-h-11 rounded-md border-2 px-3 py-2 font-semibold transition-colors",
                preset === a
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-ink hover:border-primary/50",
              )}
            >
              ${a}
            </button>
          ))}
        </div>
        {preset && amountHints[preset] ? (
          <p className="mt-2 text-xs text-ink-faint">
            {amountHints[preset]}{" "}
            <span className="italic">(suggested — TODO: leadership confirm)</span>
          </p>
        ) : null}

        <div className="mt-3">
          <label htmlFor="custom-amount" className="sr-only">
            Custom amount in US dollars
          </label>
          <div className="flex items-center rounded-md border border-border bg-paper px-3 focus-within:ring-2 focus-within:ring-ring">
            <span className="text-ink-faint" aria-hidden="true">
              $
            </span>
            <input
              id="custom-amount"
              name="custom-amount"
              type="number"
              inputMode="numeric"
              min={minAmount}
              max={maxAmount}
              placeholder="Other amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setPreset(null);
              }}
              className="w-full bg-transparent px-2 py-2.5 text-ink outline-none"
            />
          </div>
        </div>
      </fieldset>

      {message ? (
        <p role="status" aria-live="polite" className="mt-5 rounded-md bg-muted px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Starting secure checkout…
          </>
        ) : (
          <>
            Give {frequency === "monthly" ? "monthly" : "now"}
            {Number.isFinite(amount) && amount > 0 ? ` · $${amount}` : ""}
          </>
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Secure checkout powered by Stripe
      </p>
    </form>
  );
}
