import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  "aria-label"?: string;
};

const variantClasses = {
  default:
    "bg-primary text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.28)] hover:shadow-[0_0_34px_hsl(var(--primary)/0.38)]",
  outline:
    "border border-border/80 bg-background/50 backdrop-blur hover:border-primary/50 hover:bg-accent/70 hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-6",
};

export function ActionLink({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  "aria-label": ariaLabel,
}: ActionLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href.startsWith("/api/") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
