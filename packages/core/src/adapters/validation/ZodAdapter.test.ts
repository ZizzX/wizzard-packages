import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { ZodAdapter } from './ZodAdapter';

describe('ZodAdapter', () => {
    it('should validate correctly using a real zod schema', async () => {
        const schema = z.object({
            name: z.string().min(3),
            age: z.number().min(18)
        });

        const adapter = new ZodAdapter(schema);

        // Valid data
        const validResult = await adapter.validate({ name: 'John', age: 25 });
        expect(validResult.isValid).toBe(true);
        expect(validResult.errors).toBeUndefined();

        // Invalid data
        const invalidResult = await adapter.validate({ name: 'Jo', age: 15 } as any);
        expect(invalidResult.isValid).toBe(false);
        expect(invalidResult.errors).toEqual({
            name: 'String must contain at least 3 character(s)',
            age: 'Number must be greater than or equal to 18'
        });
    });

    it('should handle nested paths correctly', async () => {
        const schema = z.object({
            user: z.object({
                profile: z.object({
                    bio: z.string().min(10)
                })
            })
        });

        const adapter = new ZodAdapter(schema);
        const result = await adapter.validate({ user: { profile: { bio: 'short' } } } as any);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual({
            'user.profile.bio': 'String must contain at least 10 character(s)'
        });
    });
});
