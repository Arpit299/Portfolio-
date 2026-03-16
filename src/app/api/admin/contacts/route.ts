import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/security";
import type { ApiResponse } from "@/types";

// Mock data - in production, fetch from database
const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Interested in hiring for AI project",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Collaboration",
    message: "Want to collaborate on RAG systems",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

function authenticateRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return false;
  }

  const decoded = verifyToken(token);
  return !!decoded;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Verify authentication
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // TODO: Fetch from database
    // const contacts = await db.contacts.findMany({
    //   orderBy: { createdAt: "desc" },
    // });

    return NextResponse.json(
      {
        success: true,
        data: mockContacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
