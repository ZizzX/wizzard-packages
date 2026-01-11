import type { IPersistenceAdapter } from '@wizzard/core';

/**
 * In-memory persistence adapter for tests or ephemeral sessions.
 */
export class MemoryAdapter implements IPersistenceAdapter {
  private storage: Record<string, any> = {};

  saveStep<T>(stepId: string, data: T): void {
    this.storage[stepId] = data;
  }

  getStep<T>(stepId: string): T | undefined {
    return this.storage[stepId] as T;
  }

  getStepWithMeta<T>(stepId: string): { data: T; timestamp: number } | undefined {
    const item = this.storage[stepId];
    if (!item) return undefined;
    return { data: item as T, timestamp: Date.now() };
  }

  clearStep(stepId: string): void {
    delete this.storage[stepId];
  }

  clear(): void {
    this.storage = {};
  }
}
