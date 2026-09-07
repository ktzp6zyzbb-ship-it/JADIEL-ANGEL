import type { LucideIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function PhilosophyCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <div className="group flex h-full flex-col border border-navy-900/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 transition-colors duration-300 group-hover:bg-gold">
          <Icon className="h-6 w-6 text-gold transition-colors duration-300 group-hover:text-navy-950" />
        </div>
        <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-wide text-navy-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{description}</p>
      </div>
    </ScrollReveal>
  );
}
