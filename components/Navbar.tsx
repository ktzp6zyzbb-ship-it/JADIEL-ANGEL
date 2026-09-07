"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import club from "@/data/club";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/85 shadow-lg backdrop-blur-md"
          : "bg-navy-950",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={club.clubName}>
          <Logo size={48} priority className="shrink-0" />
          <span className="hidden font-heading leading-tight text-white sm:block">
            <span className="block text-sm font-bold uppercase tracking-widest">
              Manassas United
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {club.navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative px-3 py-2 font-heading text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-gold",
                  active && "text-gold",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tryouts"
            className="hidden rounded-sm bg-gold px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white hover:shadow-gold sm:inline-block"
          >
            Register for Tryouts
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-transform duration-300",
                menuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-opacity duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-white transition-transform duration-300",
                menuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
