"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import club from "@/data/club";
import SocialIcons from "./SocialIcons";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden border-t border-white/10 bg-navy-950 lg:hidden"
        >
          <nav className="flex flex-col px-5 py-4">
            {club.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "border-b border-white/5 py-3 font-heading text-base font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-gold",
                  pathname === item.href && "text-gold",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tryouts"
              onClick={onClose}
              className="mt-5 rounded-sm bg-gold px-5 py-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-navy-950"
            >
              Register for Tryouts
            </Link>
            <SocialIcons className="mt-6" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
