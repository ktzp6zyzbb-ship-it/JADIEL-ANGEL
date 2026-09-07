import type { Metadata } from "next";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import CoachCard from "@/components/CoachCard";
import PitchPattern from "@/components/PitchPattern";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "Meet the Manassas United Academy coaching staff dedicated to technical, tactical, physical and mental player development.",
};

export default function CoachesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Our Staff
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Our Coaches.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              A coaching staff focused on technical, tactical, physical and mental development at every age
              group.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-navy-50/60 py-24">
        <Container>
          <ScrollReveal className="mb-10 border-l-2 border-gold bg-white p-5 text-sm text-navy-700/80">
            {club.coachesNote}
          </ScrollReveal>

          <SectionHeading eyebrow="Coaching Staff" title="MEET THE" accent="STAFF" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.coaches.map((coach, index) => (
              <CoachCard key={coach.slug} coach={coach} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Coaching Opportunities"
        title="INTERESTED IN"
        accent="COACHING?"
        description="Reach out to our staff to learn about coaching opportunities with Manassas United."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/about"
        secondaryLabel="Learn About the Club"
      />
    </>
  );
}
