"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { InstagramLogoIcon, PauseIcon, PlayIcon, UserIcon } from "@phosphor-icons/react";
import { A11y, Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";
import type { LeadershipMember } from "@/content/leadership";

const css = `
  .spark-leadership-carousel {
    width: 100%;
    padding-top: 8px !important;
    padding-bottom: 56px !important;
  }

  .spark-leadership-carousel .swiper-slide {
    width: min(21rem, 82vw);
    height: 27.5rem;
    border-radius: 1.25rem;
  }

  .spark-leadership-carousel .swiper-slide-shadow {
    border-radius: 1.25rem;
  }

  .spark-leadership-carousel .swiper-pagination-bullet {
    background-color: var(--color-ink) !important;
  }

  .spark-leadership-carousel .swiper-pagination-bullet-active {
    background-color: var(--color-primary) !important;
  }
`;

export function LeadershipCarousel({
  people,
  className,
}: {
  people: LeadershipMember[];
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleAutoplay = () => {
    if (!swiperInstance) return;

    if (isPaused) {
      swiperInstance.autoplay.start();
      setIsPaused(false);
    } else {
      swiperInstance.autoplay.stop();
      setIsPaused(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn("relative mx-auto w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      {!reducedMotion ? (
        <div className="absolute bottom-0 left-5 z-10 flex h-14 items-center">
          <button
            type="button"
            onClick={toggleAutoplay}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-ink transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
            aria-pressed={isPaused}
          >
            {isPaused
              ? <PlayIcon className="h-3.5 w-3.5" weight="fill" aria-hidden="true" />
              : <PauseIcon className="h-3.5 w-3.5" weight="fill" aria-hidden="true" />}
          </button>
        </div>
      ) : null}

      <Swiper
        effect="creative"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        rewind
        speed={600}
        onSwiper={setSwiperInstance}
        creativeEffect={{
          limitProgress: 2,
          prev: {
            shadow: true,
            origin: "left center",
            translate: ["-5%", 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            shadow: true,
            origin: "right center",
            translate: ["5%", 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        autoplay={
          reducedMotion || isPaused
            ? false
            : {
                delay: 3500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }
        }
        pagination={{ clickable: true }}
        a11y={{
          prevSlideMessage: "Show previous team member",
          nextSlideMessage: "Show next team member",
        }}
        className="spark-leadership-carousel"
        modules={[EffectCreative, Autoplay, Pagination, A11y]}
      >
        {people.map((person, i) => {
          const emberLed = i % 2 === 0;
          return (
            <SwiperSlide key={person.name}>
              <article
                aria-label={`${i + 1} of ${people.length}: ${person.name}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] shadow-lg"
              >
                {/* Ethereal brand backdrop — alternating ember/teal per person,
                    with grain, a soft halo behind the figure, and drifting orbs. */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    emberLed
                      ? "from-primary via-primary/70 to-accent"
                      : "from-accent via-accent/70 to-primary",
                  )}
                >
                  <div className="absolute inset-0 bg-spark-grain" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(90% 65% at 50% 78%, rgb(255 255 255 / 0.32), transparent 70%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-white/20 blur-2xl"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 top-1/3 h-44 w-44 rounded-full bg-white/15 blur-3xl"
                  />
                </div>

                {person.image ? (
                  /* Transparent-background portrait, anchored to the card's bottom
                     edge. The wrapper applies the per-person zoom/lift so it doesn't
                     fight the hover scale transform on the image itself. */
                  <div
                    className="absolute inset-0 origin-bottom"
                    style={
                      person.imageZoom || person.imageLift
                        ? {
                            transform: [
                              person.imageLift ? `translateY(-${person.imageLift}%)` : "",
                              person.imageZoom ? `scale(${person.imageZoom})` : "",
                            ]
                              .join(" ")
                              .trim(),
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={person.image}
                      alt={person.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 640px) 82vw, 336px"
                      className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <>
                    <UserIcon
                      className="absolute left-1/2 top-[42%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-white/25"
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <span className="absolute left-5 top-5 rounded-md bg-black/30 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/80">
                      Photo pending
                    </span>
                  </>
                )}

                {/* Scrim keeps the lower-third text readable over the figure. */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Faint hairline for the ethereal finish. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />

                <div className="relative flex items-start justify-end p-5">
                  <span className="font-display text-sm tracking-[0.2em] text-white/70">
                    {String(i + 1).padStart(2, "0")} / {String(people.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-auto p-6 text-white">
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{person.role}</p>
                  <a
                    href={`https://instagram.com/${person.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on Instagram`}
                    className="mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
                  >
                    <InstagramLogoIcon
                      className="h-4 w-4 shrink-0"
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <span className="break-all">@{person.instagram}</span>
                  </a>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
}
