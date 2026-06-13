"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  GraduationCapIcon,
  PackageIcon,
  StackIcon,
  TrendUpIcon,
  TruckIcon,
} from "@phosphor-icons/react";
import { A11y, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const STEPS = [
  {
    icon: StackIcon,
    title: "Collect",
    body: "Donors and partners give useful goods, materials, and funds.",
    image: "/images/how-it-works/collect.jpg?v=2",
  },
  {
    icon: PackageIcon,
    title: "Pack",
    body: "Volunteers sort and pack supplies into Spark Boxes.",
    image: "/images/how-it-works/pack.jpg?v=2",
  },
  {
    icon: TruckIcon,
    title: "Deliver",
    body: "Boxes reach families, students, and community partners.",
    image: "/images/how-it-works/deliver.jpg?v=2",
  },
  {
    icon: GraduationCapIcon,
    title: "Host",
    body: "Spark Labs turn materials into hands-on learning.",
    image: "/images/how-it-works/host.jpg?v=2",
  },
  {
    icon: TrendUpIcon,
    title: "Grow",
    body: "Spark Studio supports mentorship, leadership, and ventures.",
    image: "/images/how-it-works/grow.jpg?v=2",
  },
];

const css = `
  .spark-process-carousel {
    width: 100%;
    padding-top: 8px !important;
    padding-bottom: 56px !important;
  }

  .spark-process-carousel .swiper-slide {
    width: min(20rem, 80vw);
    height: auto;
  }

  .spark-process-carousel .swiper-pagination-bullet {
    background-color: var(--color-ink) !important;
  }

  .spark-process-carousel .swiper-pagination-bullet-active {
    background-color: var(--color-primary) !important;
  }
`;

export function ProcessFlow() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-56 bg-spark-grain opacity-80" />

      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative mx-auto w-full max-w-4xl px-5"
      >
        <style>{css}</style>

        <Swiper
          effect="coverflow"
          grabCursor
          slidesPerView="auto"
          centeredSlides
          loop
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          a11y={{
            prevSlideMessage: "Show previous process step",
            nextSlideMessage: "Show next process step",
          }}
          className="spark-process-carousel"
          modules={[EffectCoverflow, Pagination, A11y]}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <SwiperSlide key={step.title}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-md">
                  <div className="relative h-52 overflow-hidden bg-surface-2">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 80vw, 320px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-surface-2 to-accent/20">
                        <Icon className="h-20 w-20 text-ink-faint/40" weight="duotone" aria-hidden="true" />
                        <span className="absolute bottom-3 right-3 rounded-md bg-paper/80 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-faint">
                          Image pending
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/55 to-transparent" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-on-primary shadow-sm">
                      {i + 1}
                    </span>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-accent">
                      <Icon className="h-5 w-5" weight="duotone" aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </div>
  );
}
