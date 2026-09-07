import { promises as fs } from "fs";
import path from "path";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");

/**
 * Appends a submission to a local JSON file under /data/submissions.
 * This is a local-dev convenience only — most hosts (Vercel, Netlify, etc.)
 * run serverless functions with a read-only filesystem, so this silently
 * no-ops there. See the API route files for how to wire up a real backend
 * (Formspree, Supabase, Firebase) for production form handling.
 */
export async function appendSubmission(fileName: string, entry: Record<string, unknown>) {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
    const filePath = path.join(SUBMISSIONS_DIR, fileName);

    let existing: Record<string, unknown>[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      existing = [];
    }

    existing.push({ ...entry, receivedAt: new Date().toISOString() });
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (error) {
    console.warn(`[submissions] Could not write local submission file (expected on read-only hosts):`, error);
  }
}
