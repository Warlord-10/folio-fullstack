import { Loader2 } from "lucide-react";

// ponytail: CSS-only loader — no JS/framer needed for a spinner
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="animate-pulse text-sm">Loading…</p>
    </div>
  );
}
