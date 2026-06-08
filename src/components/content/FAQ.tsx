import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/** Native <details> accordion — fully keyboard accessible with zero JS. */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-medium text-ink marker:content-none hover:bg-muted">
            <span>{item.question}</span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-ink-faint transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 text-ink-soft">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
