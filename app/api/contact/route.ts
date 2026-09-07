import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

// =============================================================================
// CONTACT FORM API ROUTE
// =============================================================================
// See /app/api/tryout/route.ts for detailed instructions on connecting a
// production backend (Formspree, Supabase, Firebase). The same pattern
// applies here — swap the body of this function for one of those options.
// =============================================================================

const REQUIRED_FIELDS = ["name", "email", "subject", "message"];

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

  console.log("[contact-form] New submission:", data);
  await appendSubmission("contact.json", data);

  return NextResponse.json({ success: true });
}
