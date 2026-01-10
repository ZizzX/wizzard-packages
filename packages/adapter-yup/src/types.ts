/**
 * Minimal structural interface for Yup-like schemas.
 */
export interface YupLikeSchema<T = any> {
  validate: (data: T, options: { abortEarly: boolean }) => Promise<any>;
}

/**
 * Minimal structural interface for Yup-like validation errors.
 */
export interface YupLikeError {
  inner: Array<{ path?: string; message: string }>;
}
