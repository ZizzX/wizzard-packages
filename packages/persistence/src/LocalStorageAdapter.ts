import type { IPersistenceAdapter } from '@wizzard/core';

/**
 * Browser persistence adapter backed by localStorage.
 */
export class LocalStorageAdapter implements IPersistenceAdapter {
  private prefix: string;

  constructor(prefix: string = 'wizard_') {
    this.prefix = prefix;
  }

  private getKey(stepId: string): string {
    return `${this.prefix}${stepId}`;
  }

  saveStep<T>(stepId: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      const payload = { timestamp: Date.now(), data };
      localStorage.setItem(this.getKey(stepId), JSON.stringify(payload));
    } catch (error) {
      console.warn('LocalStorageAdapter: Failed to save step', error);
    }
  }

  getStep<T>(stepId: string): T | undefined {
    if (typeof window === 'undefined') return undefined;
    try {
      const item = localStorage.getItem(this.getKey(stepId));
      if (!item) return undefined;

      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === 'object' && 'timestamp' in parsed && 'data' in parsed) {
        return parsed.data as T;
      }
      return parsed as T;
    } catch (error) {
      console.warn('LocalStorageAdapter: Failed to get step', error);
      return undefined;
    }
  }

  getStepWithMeta<T>(stepId: string): { data: T; timestamp: number } | undefined {
    if (typeof window === 'undefined') return undefined;
    try {
      const item = localStorage.getItem(this.getKey(stepId));
      if (!item) return undefined;

      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === 'object' && 'timestamp' in parsed && 'data' in parsed) {
        return parsed as { data: T; timestamp: number };
      }
      return { data: parsed as T, timestamp: 0 };
    } catch (error) {
      return undefined;
    }
  }

  clearStep(stepId: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(this.getKey(stepId));
    } catch (error) {
      console.warn('LocalStorageAdapter: Failed to clear step', error);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}
