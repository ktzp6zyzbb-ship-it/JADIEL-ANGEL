import { ArrowDown } from "lucide-react";
import club from "@/data/club";
import ScrollReveal from "./ScrollReveal";

export default function PathwayDiagram() {
  const { steps } = club.pathway;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      {steps.map((step, index) => (
        <div key={step} className="flex w-full flex-col items-center">
          <ScrollReveal delay={index * 0.12} className="w-full">
            <div
              className={`w-full border px-6 py-5 text-center font-heading text-base font-bold uppercase tracking-wide sm:text-lg ${
                index === 0
                  ? "border-gold bg-gold text-navy-950"
                  : index === steps.length - 1
                    ? "border-gold/60 bg-navy-900 text-gold"
                    : "border-white/15 bg-navy-900/60 text-white"
              }`}
            >
              {step}
            </div>
          </ScrollReveal>
          {index < steps.length - 1 && (
            <ArrowDown className="my-2 h-6 w-6 shrink-0 text-gold/70" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
