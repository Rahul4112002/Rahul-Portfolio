// Shared session store for admin authentication
// In production, replace this with Redis or a database

interface Session {
  username: string;
  createdAt: number;
}

// Use global to persist sessions across hot reloads in development
const globalForSessions = globalThis as unknown as {
  adminSessions: Map<string, Session> | undefined;
};

export const sessions = globalForSessions.adminSessions ?? new Map<string, Session>();

if (process.env.NODE_ENV !== 'production') {
  globalForSessions.adminSessions = sessions;
}

// Clean up old sessions (older than 24 hours)
export function cleanupOldSessions() {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  for (const [token, session] of sessions.entries()) {
    if (session.createdAt < oneDayAgo) {
      sessions.delete(token);
    }
  }
  console.log(`[Sessions] Cleanup complete. Active sessions: ${sessions.size}`);
}
