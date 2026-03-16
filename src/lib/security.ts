import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DOMPurify from "dompurify";
import type { JWTPayload } from "@/types";

const JWT_EXPIRY = "24h";
const BCRYPT_ROUNDS = 12;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }
  return secret;
}

// Initialize DOMPurify for Node.js if needed
let purify: any = DOMPurify;
if (typeof window === "undefined") {
  try {
    const { JSDOM } = require("jsdom");
    const dom = new JSDOM("");
    purify = DOMPurify(dom.window as any) as any;
  } catch {
    // DOMPurify in client-side only mode
    console.warn("DOMPurify server-side initialization skipped");
  }
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  const jwtSecret = getJwtSecret();
  return jwt.sign(payload, jwtSecret, {
    expiresIn: JWT_EXPIRY,
    algorithm: "HS256",
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const jwtSecret = getJwtSecret();
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ["HS256"],
    });
    return decoded as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || typeof authHeader !== "string") return null;
  const match = authHeader.match(/^Bearer\s+([^\s]+)$/);
  return match ? match[1] : null;
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (typeof window === "undefined") {
    // Server-side simple sanitization
    return input
      .replace(/[<>]/g, "")
      .trim();
  }
  return purify.sanitize(input, { ALLOWED_TAGS: [] });
}

/**
 * Sanitize HTML content
 */
export function sanitizeHTML(html: string): string {
  if (typeof window === "undefined") {
    // Server-side basic sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/on\w+\s*=/gi, "");
  }
  return purify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "a"],
    ALLOWED_ATTR: ["href", "title"],
  });
}

/**
 * Hash IP address for storage
 */
export function hashIpAddress(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

/**
 * Generate rate limit key
 */
export function generateRateLimitKey(
  endpoint: string,
  identifier: string
): string {
  return `rate:${endpoint}:${identifier}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, stored: string): boolean {
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(stored)
    );
  } catch {
    return false;
  }
}
