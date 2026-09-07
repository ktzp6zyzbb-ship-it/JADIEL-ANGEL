import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PathwayDiagram from "@/components/PathwayDiagram";
import PitchPattern from "@/components/PitchPattern";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Manassas United Academy's mission, values, and history as a nonprofit youth soccer club serving Prince William County and Northern Virginia.",
};

export default function AboutPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              About Manassas United
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Our Club.
            </h1>
          </ScrollReveal>
        </Container>
      </section>

      {/* OUR CLUB */}
      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Our Club"
              title="A NONPROFIT"
              accent="ACADEMY"
              description="Manassas United is a youth soccer organization serving players and families throughout Prince William County and Northern Virginia. As a nonprofit 501(c)(3) organization, the club exists to provide high-quality, competitive soccer training while keeping opportunities accessible and affordable for players from different backgrounds."
            />
            <ScrollReveal delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <SmartImage
                  src="/images/about/club-photo.jpg"
                  alt="Manassas United players training"
                  label="Club Photo"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center gap-4 border-l-2 border-gold bg-navy-50/60 p-6">
              <CalendarClock className="h-6 w-6 shrink-0 text-gold-700" />
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-navy-900/60">
                  Established
                </p>
                <p className="font-heading text-lg font-bold text-navy-900">{club.established}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* OUR MISSION */}
      <section className="bg-navy-900 py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Our Mission
              </p>
              <p className="mt-5 font-heading text-2xl font-medium leading-snug text-white sm:text-3xl md:text-4xl">
                &ldquo;{club.mission}&rdquo;
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-10 flex flex-wrap justify-center gap-2.5">
                {club.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-sm border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/75"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* OUR VALUES */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Our Values" title="WHAT WE" accent="STAND FOR" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.values.map((value, index) => (
              <ScrollReveal key={value.name} delay={index * 0.08}>
                <div className="h-full border border-navy-900/10 p-7 transition-all duration-300 hover:border-gold/50 hover:shadow-lg">
                  <span className="font-heading text-4xl font-black text-gold/30">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold uppercase text-navy-900">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* OUR HISTORY */}
      <section className="bg-navy-50/60 py-24">
        <Container>
          <SectionHeading
            eyebrow="Our History"
            title="THE STORY SO"
            accent="FAR"
            description="A timeline built to grow — new milestones will be added here as Manassas United's story continues."
          />

          <div className="relative mt-14 space-y-10 border-l-2 border-gold/40 pl-8 sm:pl-10">
            {club.history.map((item, index) => (
              <ScrollReveal key={`${item.year}-${item.title}`} delay={index * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-gold bg-white sm:-left-[49px]" />
                  <p className="font-heading text-sm font-bold uppercase tracking-widest text-gold-700">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-bold uppercase text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-navy-700/75">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* OUR PLAYER PATHWAY */}
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <SectionHeading
            eyebrow="Our Player Pathway"
            title="WHERE THE JOURNEY"
            accent="LEADS"
            align="center"
            light
          />
          <div className="mt-14">
            <PathwayDiagram />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pathway"
              className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white"
            >
              Explore the Full Pathway
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
