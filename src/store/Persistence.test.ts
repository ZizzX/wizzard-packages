import { describe, expect, test } from "vitest";
import { WizardStore } from "./WizardStore";
import type { IWizardConfig, IPersistenceAdapter } from "../types";

// Mock Adapter
class MockAdapter implements IPersistenceAdapter {
  storage = new Map<string, string>();

  saveStep<T>(stepId: string, data: T) {
    this.storage.set(stepId, JSON.stringify({ timestamp: Date.now(), data }));
  }

  getStep<T>(stepId: string): T | undefined {
    const item = this.storage.get(stepId);
    if (!item) return undefined;
    const parsed = JSON.parse(item);
    return parsed.data;
  }

  // Custom helper to seed old data
  seed(stepId: string, data: any, timestamp: number) {
    this.storage.set(stepId, JSON.stringify({ timestamp, data }));
  }

  getStepWithMeta(stepId: string) {
    const item = this.storage.get(stepId);
    if (!item) return undefined;
    return JSON.parse(item);
  }

  clearStep(stepId: string) {
    this.storage.delete(stepId);
  }

  clear() {
    this.storage.clear();
  }
}

describe("WizardStore Persistence", () => {
  const initialData = { name: "Alice", age: 30 };
  const config: IWizardConfig<any> = {
    steps: [
      { id: "step1", label: "Step 1" },
      { id: "step2", label: "Step 2" },
    ],
  };

  test("Hydration uses latest timestamp (Latest Snapshot Wins)", () => {
    const adapter = new MockAdapter();
    // Seed Step 1 with OLD data (ts: 100)
    adapter.seed('step1', { name: "Old Name" }, 100);
    // Seed Step 2 with NEWER data (ts: 200) - Simulating user visited step 2 later
    adapter.seed('step2', { name: "New Name" }, 200);

    const store = new WizardStore(initialData, []);
    store.injectPersistence(adapter);

    // Dispatch INIT to set config (store needs config to iterate steps)
    store.dispatch({ type: 'INIT', payload: { data: initialData, config } });

    // Hydrate
    store.hydrate();

    // Should have "New Name" because ts: 200 > ts: 100
    expect(store.getSnapshot().data.name).toBe("New Name");
  });

  test("Hydration respects order if timestamps are mixed", () => {
    const adapter = new MockAdapter();
    // Step 1: Recent (ts: 500)
    adapter.seed('step1', { name: "Recent Name" }, 500);
    // Step 2: Old (ts: 100)
    adapter.seed('step2', { name: "Old Name" }, 100);

    const store = new WizardStore(initialData, []);
    store.injectPersistence(adapter);
    store.dispatch({ type: 'INIT', payload: { data: initialData, config } });

    store.hydrate();

    // Should have "Recent Name" because ts: 500 > ts: 100
    expect(store.getSnapshot().data.name).toBe("Recent Name");
  });

  test("clearStepStorage removes data from adapter", () => {
    const adapter = new MockAdapter();
    adapter.seed('step1', { name: "To Delete" }, 100);

    const store = new WizardStore(initialData, []);
    store.injectPersistence(adapter);
    store.dispatch({ type: 'INIT', payload: { data: initialData, config } });

    expect(adapter.getStep('step1')).toBeDefined();

    store.clearStepStorage('step1');

    expect(adapter.getStep('step1')).toBeUndefined();
  });
});
