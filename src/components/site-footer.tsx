import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="text-sm text-muted-foreground">
          Built for fast scenario exploration. Not an official IAM.
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
