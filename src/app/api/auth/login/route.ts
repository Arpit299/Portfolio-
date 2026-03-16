import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { comparePassword, generateToken } from "@/lib/security";
import type { ApiResponse } from "@/types";

// Mock admin credentials - in production, use database
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$12$..."; // bcrypt hash

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = loginSchema.parse(body);

    // Check credentials (in production, check against database)
    if (validatedData.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(validatedData.password, ADMIN_PASSWORD_HASH);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: "admin",
      email: validatedData.email,
    });

    const response = NextResponse.json(
      {
        success: true,
        data: { token, email: validatedData.email },
        message: "Login successful",
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
