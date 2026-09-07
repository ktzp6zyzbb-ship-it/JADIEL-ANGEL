"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const subjects = [
  "General Questions",
  "Tryouts",
  "Coaching",
  "Sponsorships",
  "Partnerships",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 border border-gold/40 bg-navy-900 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="font-heading text-2xl font-bold uppercase text-white">Message Sent</h3>
        <p className="max-w-md text-white/70">
          Thanks for reaching out to Manassas United. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-heading text-sm font-bold uppercase tracking-wide text-gold underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Name *
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Player Birth Year
        </label>
        <input
          type="text"
          name="playerBirthYear"
          placeholder="e.g. 2011"
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Subject *
        </label>
        <select
          name="subject"
          required
          defaultValue=""
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
        >
          <option value="" disabled className="text-navy-900">
            Select a topic...
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject} className="text-navy-900">
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/70">
          Message *
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full border border-white/15 bg-navy-950/40 px-4 py-3 text-white outline-none transition-colors focus:border-gold"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-400 sm:col-span-2">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-navy-950 transition-all duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </button>
    </form>
  );
}
