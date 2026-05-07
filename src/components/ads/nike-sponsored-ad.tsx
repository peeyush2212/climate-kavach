"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const NIKE_URL = "https://www.nike.in/nike-pegasus-42-women-s-road-running-shoes/p/26001322";

const feedbackOptions = [
  "Not interested in this ad",
  "Seen this ad multiple times",
  "Ad was inappropriate",
  "Ad covered content",
  "Ad was irrelevant",
];

type NikeSponsoredAdProps = {
  placement?: "banner" | "rectangle";
  className?: string;
};

export function NikeSponsoredAd({ placement = "rectangle", className }: NikeSponsoredAdProps) {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const isBanner = placement === "banner";

  function openAd() {
    if (feedbackOpen || closed) return;
    window.location.href = NIKE_URL;
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
          isBanner ? "min-h-[118px]" : "min-h-[300px]",
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
          isBanner ? "min-h-[118px]" : "min-h-[300px]",
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
        <div className={cn("mt-3 grid gap-2", isBanner ? "sm:grid-cols-2" : "")}>
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
        isBanner ? "min-h-[118px]" : "min-h-[300px]",
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
          isBanner ? "items-center" : "min-h-[300px] flex-col justify-between"
        )}
      >
        <div className={cn("min-w-0", isBanner ? "max-w-[45%]" : "")}>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Nike Running Shoes</div>
          <h3 className={cn("mt-2 font-black leading-none tracking-normal", isBanner ? "text-xl" : "text-3xl")}>
            Run Beyond Limits
          </h3>
          <p className={cn("mt-2 font-semibold leading-5 text-slate-600", isBanner ? "hidden text-xs sm:block" : "text-sm")}>
            Responsive road running comfort with a fast, everyday feel.
          </p>
          <div className="mt-3 inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white transition group-hover:bg-orange-500">
            Shop now
          </div>
        </div>

        <div className={cn("relative flex flex-1 items-center justify-center overflow-hidden", isBanner ? "h-[88px]" : "min-h-[150px]")}>
          <div className="absolute inset-x-2 bottom-2 h-10 rounded-full bg-black/25 blur-xl" />
          <img
            src="/ads/nike-running-shoes.jpg"
            alt="Nike running shoes"
            className={cn(
              "relative z-10 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.28)] transition duration-300 group-hover:scale-[1.03]",
              isBanner ? "h-[115px] max-w-full" : "max-h-[205px] w-full"
            )}
          />
        </div>
      </div>
    </section>
  );
}
