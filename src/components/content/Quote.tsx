export function Quote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="relative rounded-lg border border-border bg-surface-2 p-8">
      <span
        aria-hidden="true"
        className="absolute left-6 top-2 font-display text-6xl leading-none text-primary/30"
      >
        &ldquo;
      </span>
      <blockquote className="relative font-display text-xl leading-relaxed text-ink">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-sm font-medium text-ink-faint">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
