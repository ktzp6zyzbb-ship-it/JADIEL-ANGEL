"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import club from "@/data/club";

const positions = [
  "Goalkeeper",
  "Center Back",
  "Full Back",
  "Defensive Midfielder",
  "Central Midfielder",
  "Attacking Midfielder",
  "Winger",
  "Forward / Striker",
];

const birthYears = club.teams.map((team) => team.birthYear);

type Status = "idle" | "submitting" | "success" | "error";

export default function TryoutForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed) return;

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/tryout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      form.reset();
      setAgreed(false);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong submitting your registration. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 border border-gold/40 bg-navy-900 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="font-heading text-2xl font-bold uppercase text-white">Registration Received</h3>
        <p className="max-w-md text-white/70">
          Thank you for registering interest in Manassas United. A member of our staff will follow up with
          next steps and tryout details.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-heading text-sm font-bold uppercase tracking-wide text-gold underline underline-offset-4"
        >
          Submit another registration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Player First Name" name="firstName" required />
      <Field label="Player Last Name" name="lastName" required />
      <Field label="Date of Birth" name="dateOfBirth" type="date" required />
      <SelectField label="Birth Year" name="birthYear" options={birthYears} required />
      <Field label="Current Team (if any)" name="currentTeam" />
      <SelectField label="Primary Position" name="primaryPosition" options={positions} required />
      <SelectField label="Secondary Position" name="secondaryPosition" options={positions} />
      <Field label="Parent/Guardian Name" name="guardianName" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" required />

      <div className="sm:col-span-2">
        <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-navy-900/70">
          Comments
        </label>
        <textarea
          name="comments"
          rows={4}
          className="w-full border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold"
        />
      </div>

      <label className="flex items-start gap-3 sm:col-span-2">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-gold"
        />
        <span className="text-sm text-navy-700/80">
          I understand that completing this form does not guarantee placement on a Manassas United roster.
        </span>
      </label>

      {status === "error" && <p className="text-sm font-semibold text-red-600 sm:col-span-2">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting" || !agreed}
        className="mt-2 inline-flex items-center justify-center gap-2 bg-navy-900 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-gold hover:text-navy-950 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Register for Tryouts
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-navy-900/70">
        {label}
        {required && <span className="text-gold-700"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-navy-900/70">
        {label}
        {required && <span className="text-gold-700"> *</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
