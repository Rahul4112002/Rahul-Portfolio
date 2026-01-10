import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions } from "@/lib/sessions";

// Match categories from src/data/projects.tsx - All 9 categories (excluding "All")
const CATEGORIES = [
  "AI Agents",
  "Generative AI",
  "Machine Learning",
  "Python",
  "Gen AI",
  "Full Stack",
  "Deep Learning",
  "NLP"
];

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (!sessionToken || !sessions.has(sessionToken)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { categories: CATEGORIES },
      { status: 200 }
    );
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
