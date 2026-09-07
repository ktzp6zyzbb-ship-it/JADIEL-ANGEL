import type { Metadata } from "next";
import {
  Target,
  Brain,
  Zap,
  Dumbbell,
  MessageCircle,
  Heart,
  Backpack,
  Droplets,
  Shirt,
  Footprints,
  ClipboardList,
} from "lucide-react";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PitchPattern from "@/components/PitchPattern";
import TryoutForm from "@/components/TryoutForm";

export const metadata: Metadata = {
  title: "Tryouts",
  description:
    "Register for Manassas United Academy tryouts. Learn about age groups, what to bring, what coaches evaluate, and the tryout process.",
};

const whyTryout = [
  "Train and compete in a high-level competitive environment.",
  "Work with coaches focused on technical, tactical, physical and mental development.",
  "Access a clear pathway toward college and higher-level opportunities.",
  "Join a nonprofit club committed to accessible, competitive soccer.",
];

const whatToBring = [
  { icon: Footprints, label: "Cleats" },
  { icon: Shirt, label: "Shin guards" },
  { icon: Droplets, label: "Water bottle" },
  { icon: Backpack, label: "Comfortable athletic wear" },
];

const evaluationAreas = [
  { icon: Target, label: "Technical Ability" },
  { icon: Brain, label: "Decision Making" },
  { icon: Zap, label: "Work Rate" },
  { icon: Dumbbell, label: "Athleticism" },
  { icon: MessageCircle, label: "Communication" },
  { icon: Heart, label: "Character" },
];

const process = [
  {
    step: "01",
    title: "Register",
    description: "Complete the online registration form with player and contact information.",
  },
  {
    step: "02",
    title: "Confirmation",
    description: "Our staff will follow up with tryout dates, location and check-in details.",
  },
  {
    step: "03",
    title: "Evaluation",
    description: "Players are evaluated across technical, tactical, physical and mental areas.",
  },
  {
    step: "04",
    title: "Next Steps",
    description: "Families are contacted with results and next steps for the upcoming season.",
  },
];

export default function TryoutsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Tryouts
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Earn Your <span className="text-gold">Place.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Manassas United is looking for committed, competitive players ready to train and compete at
              the next level. {club.teamsNote}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* WHY TRY OUT */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Why Try Out" title="TRAIN WITH" accent="PURPOSE" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyTryout.map((reason, index) => (
              <ScrollReveal key={reason} delay={index * 0.08}>
                <div className="flex items-start gap-3 border-l-2 border-gold bg-navy-50/60 p-5">
                  <span className="font-heading text-lg font-black text-gold-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-navy-700/80">{reason}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* AGE GROUPS */}
      <section className="bg-navy-50/60 py-24">
        <Container>
          <SectionHeading eyebrow="Age Groups" title="WHO WE'RE" accent="LOOKING FOR" align="center" />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {club.teams.map((team, index) => (
              <ScrollReveal key={team.slug} delay={index * 0.05}>
                <span className="inline-block border border-navy-900/15 bg-white px-6 py-3 font-heading text-lg font-bold text-navy-900 shadow-sm">
                  {team.ageGroup}
                </span>
              </ScrollReveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-navy-700/60">
            {club.teamsNote}
          </p>
        </Container>
      </section>

      {/* WHAT TO BRING */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Come Prepared" title="WHAT TO" accent="BRING" />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {whatToBring.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.08}>
                <div className="flex flex-col items-center gap-3 border border-navy-900/10 p-6 text-center">
                  <item.icon className="h-7 w-7 text-gold-700" />
                  <span className="font-heading text-sm font-bold uppercase tracking-wide text-navy-900">
                    {item.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT COACHES EVALUATE */}
      <section className="bg-navy-950 py-24">
        <Container>
          <SectionHeading eyebrow="Evaluation" title="WHAT COACHES" accent="LOOK FOR" align="center" light />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationAreas.map((area, index) => (
              <ScrollReveal key={area.label} delay={index * 0.06}>
                <div className="flex items-center gap-4 border border-white/10 bg-navy-900/60 p-6 transition-colors duration-300 hover:border-gold/50">
                  <area.icon className="h-6 w-6 shrink-0 text-gold" />
                  <span className="font-heading text-base font-bold uppercase tracking-wide text-white">
                    {area.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TRYOUT PROCESS */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="How It Works" title="THE TRYOUT" accent="PROCESS" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="relative">
                  <span className="font-heading text-6xl font-black text-navy-900/[0.06]">{item.step}</span>
                  <h3 className="-mt-6 font-heading text-lg font-bold uppercase text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700/75">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* REGISTRATION FORM */}
      <section className="relative overflow-hidden bg-navy-50/60 py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal className="mb-4 flex items-center gap-2 text-navy-900/50">
              <ClipboardList className="h-5 w-5" />
              <span className="font-heading text-xs font-bold uppercase tracking-widest">
                Registration
              </span>
            </ScrollReveal>
            <SectionHeading title="REGISTER FOR" accent="TRYOUTS" />
            <ScrollReveal delay={0.1} className="mt-10 border border-navy-900/10 bg-white p-6 sm:p-10">
              <TryoutForm />
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
