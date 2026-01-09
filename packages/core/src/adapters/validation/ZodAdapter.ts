import type { IValidatorAdapter, ValidationResult } from '../../types';
import type { ZodLikeSchema } from './internal-types';

/**
 * Validation adapter for Zod-like schemas.
 */
export class ZodAdapter<T> implements IValidatorAdapter<T> {
  private schema: ZodLikeSchema<T>;

  constructor(schema: ZodLikeSchema<T>) {
    this.schema = schema;
  }

  async validate(data: unknown): Promise<ValidationResult> {
    const result = await this.schema.safeParseAsync(data as T);
    if (result.success) {
      return { isValid: true };
    }

    const errors: Record<string, string> = {};
    if (result.error) {
      result.error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
    }
    return { isValid: false, errors };
  }
}
