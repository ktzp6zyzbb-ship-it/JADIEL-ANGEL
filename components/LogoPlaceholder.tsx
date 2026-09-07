import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Shown wherever the real shield logo (/public/images/manassas-united-logo.png)
 * hasn't been added yet. Drop the official PNG at that exact path and this
 * placeholder disappears everywhere automatically — see components/Logo.tsx.
 */
export default function LogoPlaceholder({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("relative flex aspect-square items-center justify-center", className)}
      style={style}
      role="img"
      aria-label="Manassas United Academy logo placeholder"
    >
      <svg viewBox="0 0 100 116" className="h-full w-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
        <path
          d="M50 2 L94 16 V56 C94 84 76 102 50 114 C24 102 6 84 6 56 V16 Z"
          fill="#001A42"
          stroke="#FDBD10"
          strokeWidth="3"
        />
        <path
          d="M50 8 L88 20 V56 C88 80 72 96 50 107 C28 96 12 80 12 56 V20 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M50 14 L44 26 L32 27 L41 35 L38 47 L50 40 L62 47 L59 35 L68 27 L56 26 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <circle cx="50" cy="66" r="12" fill="none" stroke="#FDBD10" strokeWidth="2" />
        <path
          d="M50 58 L56 62.5 L54 69.5 H46 L44 62.5 Z"
          fill="none"
          stroke="#FDBD10"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2 text-center">
        <span className="font-heading text-[7px] font-bold uppercase leading-tight tracking-wider text-gold sm:text-[9px]">
          Manassas United
        </span>
        <span className="font-heading text-[10px] font-black uppercase leading-tight text-white sm:text-xs">
          Logo
        </span>
      </div>
    </div>
  );
}
