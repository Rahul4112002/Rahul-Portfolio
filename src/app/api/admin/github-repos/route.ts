import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions } from "@/lib/sessions";

const GITHUB_USERNAME = "Rahul4112002";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: Add to .env.local for higher rate limits

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    console.log('[GitHub Repos API] Auth check:', { 
      hasCookie: !!sessionToken,
      tokenPreview: sessionToken?.substring(0, 10) + '...',
      hasSession: sessionToken ? sessions.has(sessionToken) : false,
      sessionCount: sessions.size
    });

    if (!sessionToken || !sessions.has(sessionToken)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch GitHub repositories
    const headers: HeadersInit = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Admin-Panel",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    return NextResponse.json(
      { repos },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GitHub repos fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
