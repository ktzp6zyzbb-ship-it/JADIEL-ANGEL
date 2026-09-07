import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import newsArticles from "@/data/news";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import SmartImage from "@/components/SmartImage";
import PitchPattern from "@/components/PitchPattern";

export const metadata: Metadata = {
  title: "News",
  description:
    "Club news, team updates, player spotlights, college commitments and more from Manassas United Academy.",
};

const categories = [
  "Club News",
  "Team News",
  "Player Spotlight",
  "College Commitments",
  "International",
  "Tryouts",
];

export default function NewsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <ScrollReveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Club Updates
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              News.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              The articles below are demo placeholders showing how club news, team updates and player
              features will be presented once real content is published.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Categories" title="LATEST" accent="STORIES" />

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-sm border border-navy-900/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy-700/70"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 0.06} className="h-full">
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-navy-900/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <SmartImage
                      src={article.image}
                      alt={article.title}
                      label="Article Photo"
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      wrapperClassName="h-full w-full"
                    />
                    {article.isDemo && (
                      <span className="absolute left-3 top-3 bg-navy-950/85 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-gold backdrop-blur-sm">
                        Demo Article
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-gold-700">
                      <span>{article.category}</span>
                      <span className="text-navy-900/30">&bull;</span>
                      <span className="inline-flex items-center gap-1 text-navy-700/50">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-xl font-bold uppercase leading-tight text-navy-900">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700/70">{article.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-navy-900 group-hover:text-gold-700">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
