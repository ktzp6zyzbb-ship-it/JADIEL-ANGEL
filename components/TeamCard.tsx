import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Team } from "@/data/club";
import SmartImage from "./SmartImage";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group relative flex h-full w-full shrink-0 flex-col overflow-hidden border border-white/10 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <SmartImage
          src={`/images/teams/${team.slug}.jpg`}
          alt={`${team.ageGroup} team action photo`}
          label={`${team.ageGroup} Photo`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          wrapperClassName="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-gold px-3 py-1 font-heading text-xs font-bold uppercase tracking-widest text-navy-950">
          {team.ageGroup}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-heading text-2xl font-bold uppercase text-white">{team.ageGroup}</h3>
          <p className="mt-1 text-sm text-white/60">{team.program}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-gold">
          View Team
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
