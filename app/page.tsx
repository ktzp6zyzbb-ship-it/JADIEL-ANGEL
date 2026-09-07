import Link from "next/link";
import {
  Target,
  Compass,
  Dumbbell,
  ShieldCheck,
  Trophy,
  Route,
  HeartHandshake,
  Users,
  GraduationCap,
  Wallet,
  Globe2,
  Award,
  ArrowRight,
} from "lucide-react";
import club from "@/data/club";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import TeamCard from "@/components/TeamCard";
import PhilosophyCard from "@/components/PhilosophyCard";
import PathwayDiagram from "@/components/PathwayDiagram";
import AchievementCard from "@/components/AchievementCard";
import FacilityCard from "@/components/FacilityCard";
import CTASection from "@/components/CTASection";
import PitchPattern from "@/components/PitchPattern";

const introCards = [
  {
    icon: Trophy,
    title: "Elite Development",
    description: "A competitive training environment built around technical, tactical, physical and mental growth.",
  },
  {
    icon: Route,
    title: "Player Pathways",
    description: "A clear track from local competition to national showcases, college soccer and beyond.",
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    description: "A nonprofit club committed to keeping competitive soccer accessible across Northern Virginia.",
  },
];

const philosophyIcons: Record<string, typeof Target> = {
  technical: Target,
  tactical: Compass,
  physical: Dumbbell,
  mental: ShieldCheck,
};

const whyUsIcons = [Users, GraduationCap, Award, Wallet, Route, Globe2];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* SECTION 2 — CLUB INTRODUCTION */}
      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Who We Are"
              title="MORE THAN"
              accent="A CLUB."
              description={`${club.shortName} is a competitive youth soccer organization serving players and families throughout Prince William County and Northern Virginia. We believe development goes beyond winning games. Our goal is to create confident, disciplined and intelligent players who are prepared for the next level both on and off the field.`}
            />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {introCards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 0.1}>
                  <div className="group flex h-full flex-col items-start border border-navy-900/10 bg-navy-950 p-6 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors duration-300 group-hover:bg-gold">
                      <card.icon className="h-5 w-5 text-gold transition-colors duration-300 group-hover:text-navy-950" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-wide text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">{card.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — PHILOSOPHY */}
      <section className="bg-navy-50/60 py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Philosophy"
            title="HOW WE"
            accent="DEVELOP PLAYERS"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {club.philosophy.map((pillar, index) => (
              <PhilosophyCard
                key={pillar.key}
                icon={philosophyIcons[pillar.key]}
                title={pillar.title}
                description={pillar.description}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — TEAMS */}
      <section className="bg-white py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Age Groups" title="FIND YOUR" accent="TEAM" />
            <Link
              href="/teams"
              className="hidden shrink-0 items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-navy-900 hover:text-gold-700 sm:inline-flex"
            >
              View All Teams
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {club.teams.map((team) => (
              <div key={team.slug} className="w-[72vw] shrink-0 snap-start sm:w-auto">
                <TeamCard team={team} />
              </div>
            ))}
          </div>

          <Link
            href="/teams"
            className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-navy-900 hover:text-gold-700 sm:hidden"
          >
            View All Teams
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* SECTION 5 — PLAYER PATHWAY */}
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Journey"
            title="PLAYER"
            accent="PATHWAY"
            align="center"
            light
            description="A clear track built to take players from their first Manassas United training session to the highest levels of the game."
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

      {/* SECTION 6 — ACHIEVEMENTS */}
      <section className="bg-navy-900 py-24">
        <Container>
          <SectionHeading
            eyebrow="Pathway & Achievements"
            title="PROVEN ON THE"
            accent="BIGGEST STAGES"
            align="center"
            light
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {club.achievements.map((achievement, index) => (
              <AchievementCard key={achievement.title} achievement={achievement} index={index} />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/50">
            Manassas United teams have also competed in {club.eventsCompeted.join(", ")}, and other regional
            and national showcases.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/pathway"
              className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-gold hover:text-white"
            >
              See Full Pathway &amp; Achievements
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 7 — WHY MANASSAS UNITED */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Why Choose Us" title="WHY MANASSAS" accent="UNITED" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.whyUs.map((item, index) => {
              const Icon = whyUsIcons[index % whyUsIcons.length];
              return (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <div className="flex h-full gap-4 border-l-2 border-gold/60 bg-navy-50/60 p-6">
                    <Icon className="h-6 w-6 shrink-0 text-gold-700" />
                    <div>
                      <h3 className="font-heading text-base font-bold uppercase tracking-wide text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-navy-700/75">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 8 — FACILITIES */}
      <section className="bg-navy-950 py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Where We Train" title="OUR" accent="FACILITIES" light />
            <Link
              href="/facilities"
              className="hidden shrink-0 items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-gold hover:text-white sm:inline-flex"
            >
              View All Facilities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {club.facilities.slice(0, 3).map((facility, index) => (
              <FacilityCard key={facility.slug} facility={facility} index={index} />
            ))}
          </div>
          <Link
            href="/facilities"
            className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-gold hover:text-white sm:hidden"
          >
            View All Facilities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* SECTION 9 — TRYOUT CTA */}
      <CTASection
        title="YOUR NEXT CHAPTER"
        accent="STARTS HERE."
        description="Think you have what it takes to represent Manassas United?"
      />
    </>
  );
}
