/**
 * Environment variable validation
 */

export interface Environment {
  NEXT_PUBLIC_API_URL: string;
  DATABASE_URL?: string;
  JWT_SECRET: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD_HASH: string;
  NODE_ENV: "development" | "production" | "test";
  NEXT_PUBLIC_GITHUB_URL: string;
  NEXT_PUBLIC_LINKEDIN_URL: string;
}

const requiredEnvVars = [
  "NEXT_PUBLIC_API_URL",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD_HASH",
];

/**
 * Validate environment variables
 */
export function validateEnv(): Environment {
  const missingVars: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  return {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || "",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "",
    NODE_ENV: (process.env.NODE_ENV as any) || "development",
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  };
}
