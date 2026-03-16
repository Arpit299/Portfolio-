/**
 * Custom error classes for different error scenarios
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "You don't have permission to access this resource") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class RateLimitError extends Error {
  constructor(
    public retryAfter: number,
    message: string = "Too many requests"
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: Error): string {
  if (error instanceof ValidationError) {
    return "Please check your input and try again.";
  }

  if (error instanceof AuthenticationError) {
    return "Please log in to continue.";
  }

  if (error instanceof AuthorizationError) {
    return "You don't have permission to perform this action.";
  }

  if (error instanceof RateLimitError) {
    return `Too many requests. Please try again in ${error.retryAfter} seconds.`;
  }

  if (error instanceof NotFoundError) {
    return error.message;
  }

  if (error instanceof ConflictError) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again later.";
}
