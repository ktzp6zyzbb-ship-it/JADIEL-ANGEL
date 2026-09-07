import { MapPin, ExternalLink } from "lucide-react";
import type { Facility } from "@/data/club";
import SmartImage from "./SmartImage";
import ScrollReveal from "./ScrollReveal";

export default function FacilityCard({
  facility,
  index = 0,
}: {
  facility: Facility;
  index?: number;
}) {
  return (
    <ScrollReveal delay={index * 0.08} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden border border-white/10 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
        <div className="relative h-52 w-full overflow-hidden">
          <SmartImage
            src={facility.image}
            alt={`${facility.name} field`}
            label="Field Photo"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            wrapperClassName="h-full w-full"
          />
          <span className="absolute left-4 top-4 bg-navy-950/80 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-widest text-gold backdrop-blur-sm">
            {facility.fieldType}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-bold uppercase text-white">{facility.name}</h3>
          <p className="mt-2 flex items-start gap-2 text-sm text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {facility.address}
              <br />
              {facility.city}
            </span>
          </p>
          <p className="mt-3 text-sm text-white/70">{facility.purpose}</p>
          <p className="mt-1 text-sm font-semibold text-white/50">{facility.suitableFor}</p>

          <a
            href={facility.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-gold"
          >
            Google Maps
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
