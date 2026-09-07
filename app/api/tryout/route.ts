import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

// =============================================================================
// TRYOUT REGISTRATION API ROUTE
// =============================================================================
// Currently this endpoint validates the submission, logs it to the server
// console, and appends it to /data/submissions/tryouts.json for local
// development. To connect a real backend for production, replace the body
// of this function with ONE of the options below.
//
// OPTION 1 — Formspree (fastest, no backend code):
//   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
//     method: "POST",
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//     body: JSON.stringify(data),
//   });
//
// OPTION 2 — Supabase:
//   import { createClient } from "@supabase/supabase-js";
//   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
//   await supabase.from("tryout_registrations").insert(data);
//
// OPTION 3 — Firebase (Firestore):
//   import { getFirestore, collection, addDoc } from "firebase/firestore";
//   await addDoc(collection(getFirestore(app), "tryoutRegistrations"), data);
//
// Whichever option you use, keep the required-field validation below.
// =============================================================================

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "birthYear",
  "primaryPosition",
  "guardianName",
  "email",
  "phone",
];

export async function POST(request: Request) {
  let data: Record<string, unknown>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  console.log("[tryout-registration] New submission:", data);
  await appendSubmission("tryouts.json", data);

  return NextResponse.json({ success: true });
}
