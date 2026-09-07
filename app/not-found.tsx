import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import PitchPattern from "@/components/PitchPattern";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950 py-24">
      <PitchPattern />
      <Container className="relative text-center">
        <p className="font-heading text-8xl font-black text-gold sm:text-9xl">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold uppercase text-white sm:text-4xl">
          Off the Pitch
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on target.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  );
}
