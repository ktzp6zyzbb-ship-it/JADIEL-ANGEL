import Link from "next/link";
import club from "@/data/club";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo size={56} />
            <div className="font-heading leading-tight">
              <span className="block text-sm font-bold uppercase tracking-widest">
                Manassas United
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Academy
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">{club.location.display}</p>
          <p className="text-sm text-white/60">{club.location.servingArea}</p>
          <SocialIcons className="mt-5" />
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5">
            {club.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">
            Teams
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {club.teams.map((team) => (
              <li key={team.slug}>
                <Link
                  href={`/teams/${team.slug}`}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {team.ageGroup}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gold">
            Get Involved
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/tryouts" className="text-sm text-white/70 transition-colors hover:text-gold">
                Register for Tryouts
              </Link>
            </li>
            <li>
              <Link href="/coaches" className="text-sm text-white/70 transition-colors hover:text-gold">
                Meet the Coaches
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-white/70 transition-colors hover:text-gold">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-5 py-6 text-center text-xs text-white/50 sm:flex-row sm:justify-between sm:px-8 sm:text-left lg:px-10">
          <p>
            &copy; {year} {club.clubName}. All Rights Reserved.
          </p>
          <p>{club.nonprofitStatus}</p>
        </div>
      </div>
    </footer>
  );
}
