import type { Metadata } from "next";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import TeamCard from "@/components/TeamCard";
import PitchPattern from "@/components/PitchPattern";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Explore Manassas United Academy's competitive teams from U13 through U19, competing across Prince William County, Northern Virginia, and beyond.",
};

export default function TeamsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Competitive Program
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Our Teams.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Manassas United fields competitive boys teams from U13 through U19. {club.teamsNote}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {club.teams.map((team, index) => (
              <ScrollReveal key={team.slug} delay={index * 0.06} className="h-full">
                <TeamCard team={team} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Ready to Compete?"
        title="FIND YOUR"
        accent="AGE GROUP."
        description="Register for tryouts and take the first step toward joining a Manassas United team."
      />
    </>
  );
}
