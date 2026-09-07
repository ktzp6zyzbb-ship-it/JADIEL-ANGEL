import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Trophy, User } from "lucide-react";
import club from "@/data/club";
import Container from "@/components/Container";
import ScrollReveal from "@/components/ScrollReveal";
import SmartImage from "@/components/SmartImage";
import CTASection from "@/components/CTASection";
import PitchPattern from "@/components/PitchPattern";

export function generateStaticParams() {
  return club.teams.map((team) => ({ slug: team.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const team = club.teams.find((t) => t.slug === params.slug);
  if (!team) return {};
  return {
    title: `${team.ageGroup} Team`,
    description: `Meet the Manassas United ${team.ageGroup} team — ${team.program}, competing at the ${team.competitionLevel} level.`,
  };
}

export default function TeamDetailPage({ params }: { params: { slug: string } }) {
  const team = club.teams.find((t) => t.slug === params.slug);
  if (!team) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-white/60 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            All Teams
          </Link>
          <ScrollReveal>
            <span className="mt-6 inline-block bg-gold px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-widest text-navy-950">
              {team.ageGroup}
            </span>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              {team.teamName}
            </h1>
            <p className="mt-4 text-lg text-white/70">{team.program}</p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <ScrollReveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <SmartImage
                  src={`/images/teams/${team.slug}.jpg`}
                  alt={`${team.ageGroup} team photo`}
                  label={`${team.ageGroup} Photo`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="divide-y divide-navy-900/10 border border-navy-900/10">
                <InfoRow icon={ShieldCheck} label="Age Group" value={team.ageGroup} />
                <InfoRow icon={Trophy} label="Competition Level" value={team.competitionLevel} />
                <InfoRow
                  icon={User}
                  label="Head Coach"
                  value={team.headCoach ?? "Coach TBD"}
                />
                <InfoRow icon={ShieldCheck} label="Program" value={team.program} />
              </div>

              <div className="mt-8 border-l-2 border-gold bg-navy-50/60 p-6">
                <p className="text-sm text-navy-700/80">
                  League placement may vary by team and season. See the{" "}
                  <Link href="/pathway" className="font-semibold text-gold-700 underline underline-offset-2">
                    Pathway page
                  </Link>{" "}
                  for full competition details.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow={`Join the ${team.ageGroup} Program`}
        title="EARN YOUR"
        accent="PLACE."
        description={`Ready to compete for a spot on the ${team.ageGroup} roster?`}
      />
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5">
      <Icon className="h-5 w-5 shrink-0 text-gold-700" />
      <div>
        <p className="font-heading text-xs font-bold uppercase tracking-widest text-navy-900/50">{label}</p>
        <p className="font-heading text-lg font-bold text-navy-900">{value}</p>
      </div>
    </div>
  );
}
