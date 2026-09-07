import type { Metadata } from "next";
import { Award, Trophy } from "lucide-react";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PathwayDiagram from "@/components/PathwayDiagram";
import AchievementCard from "@/components/AchievementCard";
import PitchPattern from "@/components/PitchPattern";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Pathway & Achievements",
  description:
    "See how Manassas United Academy players compete in National Academy League, NCSL, Virginia State Cup and national showcases on the pathway to college and professional soccer.",
};

export default function PathwayPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              {club.competition.heading}
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Pathway &amp;<br />
              <span className="text-gold">Achievements.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">{club.competition.intro}</p>
            <p className="mt-3 max-w-2xl text-sm font-semibold text-gold/90">
              {club.competition.seasonNote}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* LEAGUES */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Competition" title="LEAGUES &" accent="COMPETITIONS" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {club.competition.leagues.map((league, index) => (
              <ScrollReveal key={league.name} delay={index * 0.08}>
                <div className="flex h-full gap-4 border border-navy-900/10 p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-lg">
                  <Trophy className="h-6 w-6 shrink-0 text-gold-700" />
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase text-navy-900">{league.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-700/75">{league.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-navy-700/60">
            League placement may vary by team and season — not every age group competes in every league
            listed above.
          </p>
        </Container>
      </section>

      {/* PATHWAY DIAGRAM */}
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Journey"
            title="THE PLAYER"
            accent="PATHWAY"
            align="center"
            light
          />
          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
            <PathwayDiagram />
            <ScrollReveal delay={0.2}>
              <div className="border border-gold/40 bg-gradient-to-br from-navy-900 to-navy-950 p-10 text-center shadow-gold">
                <Award className="mx-auto h-10 w-10 text-gold" />
                <p className="mt-4 font-heading text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  Premium Partnership
                </p>
                <h3 className="mt-3 font-heading text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                  {club.pathway.partnerBadge.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {club.pathway.partnerBadge.description}
                </p>
                <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
                <p className="mt-6 text-xs uppercase tracking-widest text-white/40">
                  Helping players pursue
                </p>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {club.pathway.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="bg-navy-900 py-24">
        <Container>
          <SectionHeading eyebrow="Achievements" title="ON-FIELD" accent="RESULTS" align="center" light />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {club.achievements.map((achievement, index) => (
              <AchievementCard key={achievement.title} achievement={achievement} index={index} />
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-gold">
                Also Competed In
              </h3>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                {club.eventsCompeted.map((event) => (
                  <span
                    key={event}
                    className="rounded-sm border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/75"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Be Part of the Pathway"
        title="COMPETE AT THE"
        accent="NEXT LEVEL."
        description="Register for tryouts and start your journey toward college and professional opportunities."
      />
    </>
  );
}
