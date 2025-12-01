import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { sessions, cleanupOldSessions } from "@/lib/sessions";

// In production, store these in environment variables or a database
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Rahul4112";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  // Default: "Rahul4112" hashed with SHA-256
  "3b3ef78aba0ba2f61c7f02a495611058c60ae8b0ecae8a41c611b644a698ba89";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Validate credentials
    const passwordHash = hashPassword(password);
    
    // Debug logging
    console.log("Login attempt:", {
      providedUsername: username,
      expectedUsername: ADMIN_USERNAME,
      providedPasswordHash: passwordHash,
      expectedPasswordHash: ADMIN_PASSWORD_HASH,
      usernameMatch: username === ADMIN_USERNAME,
      passwordMatch: passwordHash === ADMIN_PASSWORD_HASH
    });
    
    if (username !== ADMIN_USERNAME || passwordHash !== ADMIN_PASSWORD_HASH) {
      // Add delay to prevent brute force
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = generateSessionToken();
    sessions.set(sessionToken, {
      username,
      createdAt: Date.now(),
    });

    console.log(`[Login API] Session created. Total sessions: ${sessions.size}, Token: ${sessionToken.substring(0, 10)}...`);

    // Clean up old sessions (older than 24 hours)
    cleanupOldSessions();

    // Set HTTP-only cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const, // Changed from "strict" to "lax" for better compatibility
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    };

    console.log('[Login API] Setting cookie with options:', cookieOptions);
    response.cookies.set("admin_session", sessionToken, cookieOptions);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
