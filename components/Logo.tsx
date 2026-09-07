"use client";

import { useState } from "react";
import Image from "next/image";
import club from "@/data/club";
import LogoPlaceholder from "./LogoPlaceholder";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Renders the official shield at /public/images/manassas-united-logo.png.
 * Until that file exists, LogoPlaceholder renders instead — replacing the
 * PNG at that path is the only step needed to bring the real logo live
 * everywhere (navbar, hero, footer).
 */
export default function Logo({ size = 64, className, priority }: LogoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <LogoPlaceholder className={cn(className)} style={{ width: size, height: size }} />;
  }

  return (
    <Image
      src={club.logo.path}
      alt={club.logo.alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
      onError={() => setErrored(true)}
    />
  );
}
