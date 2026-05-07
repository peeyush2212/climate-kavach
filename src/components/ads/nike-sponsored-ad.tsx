"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const NIKE_URL = "https://www.nike.in/nike-pegasus-42-women-s-road-running-shoes/p/26001322";

const adImages = [
  { src: "/ads/nike-running-shoes.jpg", alt: "Nike running shoe poster" },
  { src: "/ads/nike-air-max.jpg", alt: "Nike Air Max shoes" },
];

const feedbackOptions = [
  "Not interested in this ad",
  "Seen this ad multiple times",
  "Ad was inappropriate",
  "Ad covered content",
  "Ad was irrelevant",
];

type NikeSponsoredAdProps = {
  placement?: "banner" | "rectangle" | "mini";
  className?: string;
};

export function NikeSponsoredAd({ placement = "rectangle", className }: NikeSponsoredAdProps) {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(() => (placement === "banner" ? 0 : 1));
  const isBanner = placement === "banner";
  const isMini = placement === "mini";
  const currentImage = adImages[imageIndex % adImages.length];

  React.useEffect(() => {
    if (feedbackOpen || closed) return;
    const timer = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % adImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [closed, feedbackOpen]);

  function openAd() {
    if (feedbackOpen || closed) return;
    const adWindow = window.open(NIKE_URL, "_blank", "noopener,noreferrer");
    if (adWindow) adWindow.opener = null;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAd();
    }
  }

  if (closed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-medium text-slate-500 shadow-sm",
          isMini ? "min-h-[92px]" : isBanner ? "min-h-[108px]" : "min-h-[260px]",
          className
        )}
      >
        Ad hidden
      </div>
    );
  }

  if (feedbackOpen) {
    return (
      <div
        className={cn(
          "rounded-lg border border-slate-300 bg-white p-4 text-slate-900 shadow-sm",
          isMini ? "min-h-[92px]" : isBanner ? "min-h-[108px]" : "min-h-[260px]",
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Ad closed</div>
            <div className="mt-1 text-sm font-bold text-slate-950">Why did you close this ad?</div>
          </div>
          <button
            type="button"
            aria-label="Dismiss feedback"
            className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            onClick={() => setClosed(true)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className={cn("mt-3 grid gap-2", isBanner || isMini ? "sm:grid-cols-2" : "")}>
          {feedbackOptions.map((option) => (
            <button
              key={option}
              type="button"
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-100"
              onClick={() => setClosed(true)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section
      role="link"
      tabIndex={0}
      aria-label="Sponsored Nike running shoes ad"
      onClick={openAd}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative isolate cursor-pointer overflow-hidden rounded-lg border border-slate-300 bg-slate-100 text-slate-950 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300",
        "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(248,250,252,.95)_0%,rgba(229,231,235,.94)_43%,rgba(17,24,39,.96)_44%,rgba(31,41,55,.98)_100%)]",
        "after:absolute after:-right-16 after:top-4 after:h-[140%] after:w-24 after:-rotate-12 after:bg-white/10 after:blur-sm",
        isMini ? "min-h-[92px]" : isBanner ? "min-h-[108px]" : "min-h-[260px]",
        className
      )}
    >
      <button
        type="button"
        aria-label="Close ad"
        className="absolute right-2 top-2 z-30 rounded-full bg-white/90 p-1 text-slate-700 shadow-sm hover:bg-white hover:text-slate-950"
        onClick={(e) => {
          e.stopPropagation();
          setFeedbackOpen(true);
        }}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="absolute left-2 top-2 z-20 rounded-sm bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
        Ad
      </div>
      <div className="absolute right-9 top-2 z-20 rounded-sm bg-white/85 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
        Sponsored
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full gap-4 p-4 pr-11",
          isMini ? "min-h-[92px] items-center p-3 pr-10" : isBanner ? "items-center" : "min-h-[260px] flex-col justify-between"
        )}
      >
        <div className={cn("min-w-0", isBanner ? "max-w-[45%]" : "", isMini ? "max-w-[52%]" : "")}>
          <div className={cn("font-black uppercase tracking-[0.18em] text-slate-500", isMini ? "text-[9px]" : "text-[11px]")}>Nike Running Shoes</div>
          <h3 className={cn("mt-2 font-black leading-none tracking-normal", isMini ? "text-base" : isBanner ? "text-xl" : "text-3xl")}>
            Run Beyond Limits
          </h3>
          <p className={cn("mt-2 font-semibold leading-5 text-slate-600", isBanner ? "hidden text-xs sm:block" : isMini ? "hidden" : "text-sm")}>
            Responsive road running comfort with a fast, everyday feel.
          </p>
          <div className={cn("mt-3 inline-flex items-center gap-1 font-semibold text-blue-700 underline-offset-2 group-hover:underline", isMini ? "text-[10px]" : "text-xs")}>
            Visit site
            <span aria-hidden="true">&gt;</span>
          </div>
        </div>

        <div className={cn("relative flex flex-1 items-center justify-center overflow-hidden", isMini ? "h-[76px]" : isBanner ? "h-[84px]" : "min-h-[135px]")}>
          <div className="absolute inset-x-2 bottom-2 h-10 rounded-full bg-black/25 blur-xl" />
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={cn(
              "relative z-10 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.28)] transition duration-300 group-hover:scale-[1.03]",
              isMini ? "h-[86px] max-w-full" : isBanner ? "h-[108px] max-w-full" : "max-h-[185px] w-full"
            )}
          />
        </div>
      </div>
    </section>
  );
}
