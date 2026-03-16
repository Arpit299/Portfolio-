import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sanitizeInput } from "@/lib/security";
import type { ApiResponse } from "@/types";

// Rate limiting storage (in-memory - use database for production)
const rateLimitMap = new Map<string, { count: number; resetsAt: number }>();

function checkRateLimit(identifier: string, limit: number = 5, window: number = 3600000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || record.resetsAt < now) {
    rateLimitMap.set(identifier, { count: 1, resetsAt: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Check rate limiting by IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    
    if (!checkRateLimit(`contact:${ip}`, 5, 3600000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate using Zod
    const validatedData = contactFormSchema.parse(body);

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      subject: sanitizeInput(validatedData.subject || ""),
      message: sanitizeInput(validatedData.message),
    };

    // Save to database (for now, just log - implement database storage)
    console.log("Contact Form Submission:", {
      ...sanitizedData,
      ipAddress: ip,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to PostgreSQL database
    // const contact = await db.contacts.create({
    //   name: sanitizedData.name,
    //   email: sanitizedData.email,
    //   subject: sanitizedData.subject,
    //   message: sanitizedData.message,
    //   ipAddress: hashIpAddress(ip),
    //   userAgent: request.headers.get("user-agent"),
    //   createdAt: new Date(),
    //   read: false,
    // });

    // Send email notification (implement email service)
    // await sendEmail({
    //   to: "kumawatarpit06@gmail.com",
    //   subject: `New Contact Form: ${sanitizedData.subject}`,
    //   ...
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

// CORS preflight
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
