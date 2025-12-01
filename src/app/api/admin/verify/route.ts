import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions } from "@/lib/sessions";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    console.log('[Verify API] Cookie check:', { 
      hasCookie: !!sessionToken,
      tokenPreview: sessionToken?.substring(0, 10) + '...',
      hasSession: sessionToken ? sessions.has(sessionToken) : false,
      sessionCount: sessions.size
    });

    if (!sessionToken || !sessions.has(sessionToken)) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
