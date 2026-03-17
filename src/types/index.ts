import type { Variants } from "framer-motion";

// User Types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Contact Submission Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  createdAt: Date;
  read: boolean;
  userAgent?: string;
  ipAddress?: string;
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Rate Limit Info
export interface RateLimitInfo {
  limit: number;
  current: number;
  resetTime: number;
}

// Animation Variants - Any to accommodate Framer Motion Variants type
export type AnimationVariant = Variants;

// Portfolio Data Types
export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  isEducation?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface StatsCard {
  label: string;
  value: string;
  icon: string;
}
