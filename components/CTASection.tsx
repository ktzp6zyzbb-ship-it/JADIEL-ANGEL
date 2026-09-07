import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Container from "./Container";
import PitchPattern from "./PitchPattern";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CTASection({
  eyebrow = "Join Manassas United",
  title = "YOUR NEXT CHAPTER",
  accent = "STARTS HERE.",
  description = "Think you have what it takes to represent Manassas United?",
  primaryHref = "/tryouts",
  primaryLabel = "Register for Tryouts",
  secondaryHref = "/contact",
  secondaryLabel = "Contact a Coach",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      <PitchPattern />
      <div className="absolute -right-24 top-0 h-full w-1/2 skew-x-[-12deg] bg-gold/[0.06]" aria-hidden="true" />
      <Container className="relative">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h2 className="font-heading text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
            {title} <span className="text-gold">{accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{description}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white hover:shadow-gold"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:border-gold hover:text-gold"
            >
              {secondaryLabel}
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
