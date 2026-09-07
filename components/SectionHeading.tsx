import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

/** Standard headline treatment used across every section: eyebrow, big
 * condensed title with an expanding gold underline, optional description. */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 font-heading text-sm font-semibold uppercase tracking-[0.3em]",
            light ? "text-gold" : "text-gold-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title} {accent && <span className="text-gold">{accent}</span>}
      </h2>
      <span
        className={cn(
          "mt-5 block h-1 w-20 animate-expand-line rounded-full bg-gold",
          align === "center" && "mx-auto",
        )}
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-navy-700/80",
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
