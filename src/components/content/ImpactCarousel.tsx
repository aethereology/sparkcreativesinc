"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  HandHeartIcon,
  HouseLineIcon,
  PackageIcon,
  RecycleIcon,
  SparkleIcon,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ImpactMetric } from "@/content/metrics";

/** Icons stay in the component layer (content layer is data-only). */
const METRIC_ICONS: Record<string, Icon> = {
  "spark-boxes": PackageIcon,
  families: HouseLineIcon,
  volunteers: HandHeartIcon,
  "landfill-diverted": RecycleIcon,
};

/**
 * Impact snapshot carousel — Skiper54 "Carousel_006" look (clip-path reveal on
 * the active card, blurred-in caption below), rebuilt on Embla + motion/react
 * with Warm Spark tokens. Cards show metric photos once leadership provides
 * them; until then a themed placeholder renders (same pattern as ProcessFlow).
 */
export function ImpactCarousel({ metrics }: { metrics: ImpactMetric[] }) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [current, setCurrent] = useState(0);

  // With few metrics there isn't enough slide width for Embla's seamless loop
  // (it silently disengages and left-aligns). Render the set twice — at ~3
  // visible cards per view the duplicates are never on screen together.
  const slides = metrics.length < 6 ? [...metrics, ...metrics] : metrics;
  const activeMetricIndex = current % metrics.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      aria-roledescription="carousel"
      aria-label="Impact snapshot"
      className="relative"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex h-[24rem] touch-pan-y sm:h-[28rem]">
          {slides.map((metric, index) => {
            const MetricIcon = METRIC_ICONS[metric.id] ?? SparkleIcon;
            const active = current === index;
            return (
              <div
                key={`${metric.id}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(index % metrics.length) + 1} of ${metrics.length}: ${metric.label}`}
                className="relative flex h-full min-w-0 shrink-0 grow-0 basis-[78%] items-center justify-center pl-4 sm:basis-[55%] md:basis-[42%] lg:basis-[32%]"
              >
                <div className="relative h-full w-full">
                  <motion.div
                    initial={false}
                    animate={{
                      clipPath:
                        !active && !reduceMotion
                          ? "inset(15% 0% 15% 0% round 1.5rem)"
                          : "inset(0% 0% 0% 0% round 1.5rem)",
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.32, 0.72, 0, 1] }}
                    className="h-full w-full overflow-hidden rounded-xl"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl ring-1 ring-ink/10">
                      {metric.image ? (
                        /* Brand-duotone treatment: the ember→teal gradient stays
                           the card's color story; the image blends in via
                           luminosity so its scene shows through in brand tones. */
                        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_72%,black)] via-[color-mix(in_srgb,var(--color-primary)_55%,black)] to-[color-mix(in_srgb,var(--color-accent)_72%,black)]">
                          {/* Luminosity keeps the scene but recolors it entirely in
                              brand hues; the wash above re-saturates to match the
                              original gradient's richness. */}
                          <Image
                            src={metric.image}
                            alt={metric.imageAlt ?? ""}
                            fill
                            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 30vw"
                            className="scale-105 object-cover mix-blend-luminosity"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/15 to-accent/28" />
                          {/* Flat darkening pass — leadership found the full-strength duotone too bright. */}
                          <div className="absolute inset-0 bg-black/15" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-accent">
                          <div className="absolute inset-0 bg-spark-grain" />
                          <MetricIcon
                            className="absolute left-1/2 top-[38%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/30 sm:h-28 sm:w-28"
                            weight="duotone"
                            aria-hidden="true"
                          />
                          <span className="absolute right-4 top-4 rounded-md bg-black/30 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
                            Photo pending
                          </span>
                        </div>
                      )}

                      {/* Scrim keeps the figure legible over any photo, in both themes. */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                      <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
                        <MetricIcon className="h-5 w-5" weight="duotone" aria-hidden="true" />
                      </span>

                      {/* Figure fades in with the card expansion — inactive cards
                          read as clean imagery (the clip would slice the text). */}
                      <motion.div
                        initial={false}
                        animate={
                          active || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                        }
                        transition={{ duration: reduceMotion ? 0 : 0.35, delay: active ? 0.15 : 0 }}
                        className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6"
                      >
                        <p className="font-display text-4xl font-semibold leading-none sm:text-5xl">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/85">
                          {metric.label}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption lives outside the clipped Embla viewport so it never truncates;
          the active card is always centered, so one shared caption reads the same. */}
      <div className="mx-auto mt-5 min-h-10 max-w-md px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeMetricIndex}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="text-sm text-ink-soft"
          >
            {metrics[activeMetricIndex]?.context}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          {metrics.map((metric, index) => (
            <button
              key={metric.id}
              type="button"
              aria-label={`Go to ${metric.label}`}
              aria-current={activeMetricIndex === index ? "true" : undefined}
              onClick={() =>
                // Jump to the duplicate nearest the current position so the
                // carousel moves locally instead of rewinding across the set.
                emblaApi?.scrollTo(
                  Math.floor(current / metrics.length) * metrics.length + index,
                )
              }
              className={cn(
                "h-2 rounded-full transition-all",
                activeMetricIndex === index
                  ? "w-7 bg-primary"
                  : "w-2 bg-ink-faint/40 hover:bg-ink-faint",
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
