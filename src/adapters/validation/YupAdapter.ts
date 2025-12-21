import type { IValidatorAdapter, ValidationResult } from '../../types';
import { Schema, ValidationError } from 'yup';

export class YupAdapter<T> implements IValidatorAdapter<T> {
    private schema: Schema<T>;

    constructor(schema: Schema<T>) {
        this.schema = schema;
    }

    async validate(data: T): Promise<ValidationResult> {
        try {
            await this.schema.validate(data, { abortEarly: false });
            return { isValid: true };
        } catch (err) {
            if (err instanceof ValidationError) {
                const errors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message;
                    }
                });
                return { isValid: false, errors };
            }
            throw err;
        }
    }
}
