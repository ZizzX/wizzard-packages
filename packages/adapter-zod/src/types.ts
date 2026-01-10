/**
 * Minimal structural interface for Zod-like schemas.
 */
export interface ZodLikeSchema<T = any> {
  safeParseAsync: (data: T) => Promise<{
    success: boolean;
    data?: T;
    error?: {
      issues: Array<{ path: any[]; message: string }>;
    };
  }>;
}
