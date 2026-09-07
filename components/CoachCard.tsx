import type { Coach } from "@/data/club";
import SmartImage from "./SmartImage";
import ScrollReveal from "./ScrollReveal";

export default function CoachCard({ coach, index = 0 }: { coach: Coach; index?: number }) {
  return (
    <ScrollReveal delay={index * 0.08} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden border border-navy-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-64 w-full overflow-hidden">
          <SmartImage
            src={coach.isPlaceholder ? "" : coach.photo}
            alt={`Photo of ${coach.name}`}
            label="Coach Photo"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            wrapperClassName="h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {coach.isPlaceholder && (
            <span className="mb-2 inline-block w-fit rounded-sm bg-navy-50 px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-widest text-navy-500">
              Placeholder
            </span>
          )}
          <h3 className="font-heading text-xl font-bold uppercase text-navy-900">{coach.name}</h3>
          <p className="mt-0.5 font-heading text-sm font-semibold uppercase tracking-wide text-gold-700">
            {coach.role} — {coach.team}
          </p>
          <p className="mt-3 text-sm text-navy-700/70">{coach.licenses}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-700/80">{coach.bio}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
