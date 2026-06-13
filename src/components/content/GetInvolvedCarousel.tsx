"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  BuildingsIcon,
  HandHeartIcon,
  PackageIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { A11y, Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import { AnimatedArrow } from "@/components/ui/animated-arrow";
import { cn } from "@/lib/utils";
import { cta } from "@/content/ctas";

const ROUTES = [
  {
    icon: HandHeartIcon,
    eyebrow: "Give funds",
    title: "Donate funds",
    body: "Sponsor a Spark Box or give to the program where you're needed most.",
    href: cta.donate.href,
    label: cta.donate.label,
    image: "/images/get-involved/donate-funds.jpg",
    glow: "var(--color-ember)",
  },
  {
    icon: PackageIcon,
    eyebrow: "Give goods",
    title: "Donate goods",
    body: "Give useful supplies, materials, and creative tools to the Supply Network.",
    href: cta.donateGoods.href,
    label: cta.donateGoods.label,
    image: "/images/get-involved/donate-goods.jpg",
    glow: "var(--color-accent)",
  },
  {
    icon: UsersIcon,
    eyebrow: "Give time",
    title: "Volunteer",
    body: "Help sort, pack, mentor, and run hands-on Spark Labs.",
    href: cta.volunteer.href,
    label: cta.volunteer.label,
    image: "/images/get-involved/volunteer.jpg?v=3",
    glow: "var(--color-ember)",
  },
  {
    icon: BuildingsIcon,
    eyebrow: "Team up",
    title: "Partner",
    body: "Bring your business or organization into the work as a partner.",
    href: cta.partner.href,
    label: cta.partner.label,
    image: "/images/get-involved/partner.jpg?v=2",
    glow: "var(--color-accent)",
  },
];

const css = `
  .spark-involve-carousel {
    width: 100%;
    padding-top: 8px !important;
    padding-bottom: 56px !important;
  }

  .spark-involve-carousel .swiper-slide {
    width: min(21rem, 82vw);
    height: 27.5rem;
    border-radius: 1.25rem;
  }

  .spark-involve-carousel .swiper-slide-shadow {
    border-radius: 1.25rem;
  }

  .spark-involve-carousel .swiper-pagination-bullet {
    background-color: var(--color-ink) !important;
  }

  .spark-involve-carousel .swiper-pagination-bullet-active {
    background-color: var(--color-primary) !important;
  }
`;

export function GetInvolvedCarousel({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn("relative mx-auto w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <Swiper
        effect="creative"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        rewind
        speed={600}
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
          reducedMotion
            ? false
            : {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }
        }
        pagination={{ clickable: true }}
        a11y={{
          prevSlideMessage: "Show previous way to get involved",
          nextSlideMessage: "Show next way to get involved",
        }}
        className="spark-involve-carousel"
        modules={[EffectCreative, Autoplay, Pagination, A11y]}
      >
        {ROUTES.map((route) => {
          const Icon = route.icon;
          return (
            <SwiperSlide key={route.title}>
              <Link
                href={route.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] shadow-lg"
              >
                {route.image ? (
                  <Image
                    src={route.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, 336px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/70 to-accent">
                    <Icon
                      className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-white/25"
                      weight="duotone"
                      aria-hidden="true"
                    />
                    <span className="absolute right-4 top-16 rounded-md bg-black/30 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/80">
                      Photo pending
                    </span>
                  </div>
                )}

                {/* Scrim + per-route glow keep white text readable over any photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background: `radial-gradient(120% 70% at 50% 100%, color-mix(in srgb, ${route.glow} 45%, transparent), transparent 65%)`,
                  }}
                />

                <div className="relative flex items-start justify-between p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md">
                    <Icon className="h-5 w-5" weight="duotone" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative mt-auto p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                    {route.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                    {route.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">{route.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white/20">
                    {route.label}
                    <AnimatedArrow />
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
}
