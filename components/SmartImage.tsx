"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import PitchPattern from "./PitchPattern";
import SoccerBallIcon from "./icons/SoccerBall";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  /** Text shown inside the placeholder until a real photo is dropped in. */
  label?: string;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** Set to false to render as a normal (non-fill) block-level image. */
  fill?: boolean;
};

/**
 * Drop-in replacement for next/image that never shows a broken-image icon.
 * Always renders in `fill` mode (parent must be `relative` and sized) unless
 * `fill={false}` is passed. Point `src` at a file under /public/images/...
 * — if the file does not exist yet (or fails to load), a branded navy/gold
 * placeholder renders instead. As soon as the real file is added at that
 * exact path, this component starts rendering it automatically — no code
 * changes needed.
 */
export default function SmartImage({
  src,
  alt,
  label,
  className,
  wrapperClassName,
  style,
  sizes,
  priority,
  fill = true,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950",
          wrapperClassName,
        )}
        style={style}
      >
        <PitchPattern />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
          <SoccerBallIcon className="h-8 w-8 text-gold/70" />
          <span className="font-heading text-[11px] uppercase tracking-[0.2em] text-gold/80 sm:text-xs">
            {label ?? "Photo Placeholder"}
          </span>
        </div>
      </div>
    );
  }

  if (!fill) {
    return (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
      onError={() => setErrored(true)}
    />
  );
}
