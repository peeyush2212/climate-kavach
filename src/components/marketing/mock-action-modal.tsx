"use client";

import * as React from "react";
import { ArrowRight, Info } from "lucide-react";
import { ActionLink } from "@/components/marketing/action-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type MockActionModalProps = {
  triggerLabel: string;
  title?: string;
  message?: string;
  ctaHref?: string;
  ctaLabel?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
};

export function MockActionModal({
  triggerLabel,
  title = "Demo action coming soon",
  message = "This action is part of the demo experience. Request a demo to test it with your organization data.",
  ctaHref = "/contact",
  ctaLabel = "Request demo",
  variant = "outline",
  className,
}: MockActionModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant={variant} className={className} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-cyan-300/25 bg-slate-950/95 text-slate-100 shadow-[0_0_80px_rgba(34,211,238,.20)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-cyan-50">
              <Info className="h-5 w-5 text-cyan-300" />
              {title}
            </DialogTitle>
            <DialogDescription className="text-slate-400">{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <ActionLink href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </ActionLink>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
