import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import club from "@/data/club";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import PitchPattern from "@/components/PitchPattern";
import ContactForm from "@/components/ContactForm";
import SocialIcons from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Manassas United Academy for general questions, tryouts, coaching opportunities, sponsorships, and partnerships.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      <PitchPattern />
      <Container className="relative">
        <ScrollReveal>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Get In Touch
          </p>
          <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
            {club.contact.orgName}
          </h1>
          <p className="mt-4 text-lg text-white/70">{club.location.display}</p>
          <p className="text-white/50">{club.contact.servingArea}</p>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4 border border-white/10 bg-navy-900/60 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-white/50">
                    Location
                  </p>
                  <p className="mt-1 text-white/85">{club.contact.address}</p>
                  <p className="text-sm text-white/50">{club.contact.servingArea}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border border-white/10 bg-navy-900/60 p-5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-white/50">
                    Email
                  </p>
                  <a href={`mailto:${club.contact.email}`} className="mt-1 block text-white/85 hover:text-gold">
                    {club.contact.email}
                  </a>
                </div>
              </div>

              {club.contact.phone && (
                <div className="flex items-start gap-4 border border-white/10 bg-navy-900/60 p-5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-heading text-xs font-bold uppercase tracking-widest text-white/50">
                      Phone
                    </p>
                    <a href={`tel:${club.contact.phone}`} className="mt-1 block text-white/85 hover:text-gold">
                      {club.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-white/50">
                  Follow Manassas United
                </p>
                <SocialIcons className="mt-3" />
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-gold">
                  What Can We Help With?
                </p>
                <ul className="mt-4 space-y-3">
                  {club.contact.departments.map((dept) => (
                    <li key={dept.name}>
                      <p className="font-heading text-sm font-bold uppercase text-white">{dept.name}</p>
                      <p className="text-sm text-white/50">{dept.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-3">
            <div className="border border-white/10 bg-navy-900/40 p-6 sm:p-10">
              <SectionHeading title="SEND US A" accent="MESSAGE" light className="mb-8" />
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
