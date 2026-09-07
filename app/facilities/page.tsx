import type { Metadata } from "next";
import club from "@/data/club";
import Container from "@/components/Container";
import ScrollReveal from "@/components/ScrollReveal";
import FacilityCard from "@/components/FacilityCard";
import PitchPattern from "@/components/PitchPattern";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Our Facilities",
  description:
    "Manassas United Academy trains and competes across top facilities in Manassas and Woodbridge, Virginia, including natural grass, turf, and indoor training venues.",
};

export default function FacilitiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Where We Train &amp; Compete
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Our Facilities.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              From natural grass fields to indoor turf, Manassas United trains and competes across quality
              venues throughout Prince William County.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.facilities.map((facility, index) => (
              <FacilityCard key={facility.slug} facility={facility} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="See It In Person"
        title="TRAIN WHERE"
        accent="CHAMPIONS ARE MADE."
        description="Register for tryouts and experience Manassas United's training environment firsthand."
      />
    </>
  );
}
