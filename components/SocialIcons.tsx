"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import club from "@/data/club";
import { cn } from "@/lib/utils";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const platforms = [
  { key: "instagram", label: "Instagram", href: club.socialMedia.instagram, Icon: Instagram },
  { key: "facebook", label: "Facebook", href: club.socialMedia.facebook, Icon: Facebook },
  { key: "twitter", label: "X / Twitter", href: club.socialMedia.twitter, Icon: XIcon },
  { key: "youtube", label: "YouTube", href: club.socialMedia.youtube, Icon: Youtube },
];

/**
 * Renders one icon per platform in /data/club.ts `socialMedia`. Until a real
 * URL is added there, the icon still renders (disabled/muted) so the layout
 * never looks broken — add the link and it becomes clickable automatically.
 */
export default function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {platforms.map(({ key, label, href, Icon }) => {
        const hasLink = Boolean(href);
        return (
          <a
            key={key}
            href={hasLink ? href : "#"}
            target={hasLink ? "_blank" : undefined}
            rel={hasLink ? "noopener noreferrer" : undefined}
            aria-disabled={!hasLink}
            onClick={(event) => {
              if (!hasLink) event.preventDefault();
            }}
            aria-label={label}
            title={hasLink ? label : `${label} (coming soon)`}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200",
              hasLink
                ? "hover:border-gold hover:bg-gold hover:text-navy-900"
                : "cursor-default opacity-40",
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
