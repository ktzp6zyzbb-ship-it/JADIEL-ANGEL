import type { Achievement } from "@/data/club";
import ScrollReveal from "./ScrollReveal";

export default function AchievementCard({
  achievement,
  index = 0,
}: {
  achievement: Achievement;
  index?: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-navy-900/60 p-8 transition-all duration-300 hover:border-gold/50 hover:bg-navy-900">
        <span className="absolute -right-4 -top-6 font-heading text-8xl font-black text-white/[0.04] transition-colors duration-300 group-hover:text-gold/10">
          {achievement.year}
        </span>
        <span className="relative font-heading text-3xl font-black text-gold sm:text-4xl">
          {achievement.year}
        </span>
        <h3 className="relative mt-3 font-heading text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
          {achievement.title}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-white/65">
          {achievement.description}
        </p>
      </div>
    </ScrollReveal>
  );
}
