import { AppError, ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ConflictError } from "./AppError";

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  onRetry?: (attempt: number, error: unknown) => void;
}

/**
 * Checks if an error is transient and eligible for automated retry.
 */
export function isTransientError(error: unknown): boolean {
  // Non-transient business errors must NEVER be retried
  if (
    error instanceof ValidationError ||
    error instanceof AuthenticationError ||
    error instanceof AuthorizationError ||
    error instanceof NotFoundError ||
    error instanceof ConflictError
  ) {
    return false;
  }

  if (error instanceof AppError && error.statusCode < 500) {
    return false;
  }

  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  // Transient network, connection timeout, socket, and gateway failure patterns
  return (
    msg.includes("p1001") || // Prisma database connection failure
    msg.includes("connection") ||
    msg.includes("timeout") ||
    msg.includes("econnreset") ||
    msg.includes("etimedout") ||
    msg.includes("socket") ||
    msg.includes("502") ||
    msg.includes("503") ||
    msg.includes("504") ||
    msg.includes("rate limit")
  );
}

/**
 * Executes an async function with automated exponential backoff retry for transient failures.
 */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelayMs = options.initialDelayMs ?? 500;
  const backoffFactor = options.backoffFactor ?? 2;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;

      if (attempt > maxRetries || !isTransientError(err)) {
        throw err;
      }

      const delay = initialDelayMs * Math.pow(backoffFactor, attempt - 1);
      console.warn(`🔄 Retry attempt ${attempt}/${maxRetries} after ${delay}ms delay due to transient error:`, err instanceof Error ? err.message : err);

      if (options.onRetry) {
        options.onRetry(attempt, err);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
