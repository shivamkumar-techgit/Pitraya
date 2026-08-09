/**
 * Base Application Exception class extending native JavaScript Error.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number = 500, code: string = "INTERNAL_ERROR", details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 Bad Request / Validation Failure Exception
 */
export class ValidationError extends AppError {
  constructor(message: string = "Invalid request payload format.", details?: unknown) {
    super(message, 400, "BAD_REQUEST", details);
  }
}

/**
 * 401 Unauthorized Exception
 */
export class AuthenticationError extends AppError {
  constructor(message: string = "Active session token required.", details?: unknown) {
    super(message, 401, "UNAUTHORIZED", details);
  }
}

/**
 * 403 Forbidden Access Exception
 */
export class AuthorizationError extends AppError {
  constructor(message: string = "You do not have permission to perform this action.", details?: unknown) {
    super(message, 403, "FORBIDDEN", details);
  }
}

/**
 * 404 Not Found Exception
 */
export class NotFoundError extends AppError {
  constructor(message: string = "The requested resource was not found.", details?: unknown) {
    super(message, 404, "NOT_FOUND", details);
  }
}

/**
 * 409 Conflict Exception (Duplicate Key, Race Condition)
 */
export class ConflictError extends AppError {
  constructor(message: string = "Resource conflict detected.", details?: unknown) {
    super(message, 409, "CONFLICT", details);
  }
}

/**
 * 502 External Service Exception (Razorpay, SMTP, WhatsApp Gateway Failure)
 */
export class ExternalServiceError extends AppError {
  constructor(message: string = "External service provider failed or timed out.", details?: unknown) {
    super(message, 502, "EXTERNAL_SERVICE_ERROR", details);
  }
}

/**
 * 500 Database Exception
 */
export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed.", details?: unknown) {
    super(message, 500, "DATABASE_ERROR", details);
  }
}
