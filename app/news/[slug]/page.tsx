import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import newsArticles from "@/data/news";
import Container from "@/components/Container";
import ScrollReveal from "@/components/ScrollReveal";
import SmartImage from "@/components/SmartImage";
import PitchPattern from "@/components/PitchPattern";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-24">
        <PitchPattern />
        <Container className="relative">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-white/60 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            All News
          </Link>
          <ScrollReveal>
            {article.isDemo && (
              <span className="mt-6 inline-block bg-gold px-3 py-1 font-heading text-xs font-bold uppercase tracking-widest text-navy-950">
                Demo Article
              </span>
            )}
            <p className="mt-4 font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              {article.category}
            </p>
            <h1 className="mt-3 font-heading text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/50">
              <CalendarDays className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <SmartImage
                  src={article.image}
                  alt={article.title}
                  label="Article Photo"
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="mt-10 space-y-5">
              {article.body.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-navy-700/85">
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
