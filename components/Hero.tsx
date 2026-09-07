"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import club from "@/data/club";
import Logo from "./Logo";
import SmartImage from "./SmartImage";
import PitchPattern from "./PitchPattern";

export default function Hero() {
  return (
    <section className="relative flex h-[calc(100svh-5rem)] min-h-[600px] w-full items-center overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <SmartImage
          src="/images/hero/hero-match.jpg"
          alt="Manassas United players in a competitive match"
          label="Hero Background Photo"
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/60" />
      </div>

      <PitchPattern className="opacity-30" />
      <div
        className="absolute -right-32 top-0 hidden h-full w-1/2 skew-x-[-12deg] border-l-2 border-gold/20 sm:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Logo size={92} priority className="drop-shadow-2xl" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-sm font-semibold uppercase tracking-[0.35em] text-gold"
        >
          {club.location.display} &bull; {club.location.region}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 font-heading text-6xl font-black uppercase leading-[0.88] text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Manassas
          <br />
          United
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-1 font-heading text-2xl font-bold uppercase tracking-[0.4em] text-gold sm:text-3xl"
        >
          Academy
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
        >
          {club.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/tryouts"
            className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white hover:shadow-gold"
          >
            Register for Tryouts
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/teams"
            className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:border-gold hover:text-gold"
          >
            Explore Our Teams
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-7 w-7 animate-bounce text-white/60" />
      </motion.div>
    </section>
  );
}
