import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display font-semibold uppercase leading-none tracking-tight",
        className
      )}
    >
      O Primo <span className="text-primary">Digital</span>
    </span>
  );
}
