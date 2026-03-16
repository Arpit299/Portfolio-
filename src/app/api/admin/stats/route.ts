import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/security";
import type { ApiResponse } from "@/types";

interface DashboardStats {
  totalContacts: number;
  unreadMessages: number;
  projectsCompleted: number;
  yearsExperience: number;
  lastContactDate: string | null;
}

function authenticateRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return false;
  }

  const decoded = verifyToken(token);
  return !!decoded;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<DashboardStats>>> {
  try {
    // Verify authentication
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // TODO: Calculate from database
    const stats: DashboardStats = {
      totalContacts: 2,
      unreadMessages: 1,
      projectsCompleted: 15,
      yearsExperience: 2,
      lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
