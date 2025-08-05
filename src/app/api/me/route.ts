import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(request);
    // Simple session data response
    const sessionData = {
      id: "session-123",
      userId: "user-456",
      createdAt: new Date().toISOString(),
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };

    return NextResponse.json(sessionData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get session data" },
      { status: 500 }
    );
  }
}
