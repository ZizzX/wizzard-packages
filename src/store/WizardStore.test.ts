import { describe, expect, test, beforeEach, vi } from "vitest";
import { WizardStore } from "./WizardStore";
import { devToolsMiddleware } from "../middlewares/devToolsMiddleware";
import type { IWizardConfig } from "../types";

describe("WizardStore", () => {
  let store: WizardStore<any>;
  const initialData = { name: "Alice", age: 30 };
  const config: IWizardConfig<any> = {
    steps: [
      { id: "step1", label: "Step 1" },
      { id: "step2", label: "Step 2" },
    ],
  };

  beforeEach(() => {
    store = new WizardStore(initialData, []);
    store.dispatch({
        type: 'INIT',
        payload: { data: initialData, config }
    });
  });

  test("initializes with correct state", () => {
    const state = store.getSnapshot();
    expect(state.data).toEqual(initialData);
    expect(state.activeSteps.length).toBe(2);
    expect(state.visitedSteps.size).toBe(0);
  });

  test("handle SET_DATA action", () => {
    store.dispatch({
      type: "SET_DATA",
      payload: { path: "name", value: "Bob" },
    });
    expect(store.getSnapshot().data.name).toBe("Bob");
  });

  test("handle GO_TO_STEP action", () => {
    store.dispatch({
      type: "GO_TO_STEP",
      payload: { from: "step1", to: "step2" },
    });
    // Assuming GO_TO_STEP updates currentStepId
    expect(store.getSnapshot().currentStepId).toBe("step2");
  });

  test("handle SET_VISITED_STEPS action", () => {
    const visited = new Set(["step1"]);
    store.dispatch({
      type: "SET_VISITED_STEPS",
      payload: { steps: visited },
    });
    expect(store.getSnapshot().visitedSteps.has("step1")).toBe(true);
  });

  test("handle SET_COMPLETED_STEPS action", () => {
      const completed = new Set(["step1"]);
      store.dispatch({
        type: "SET_COMPLETED_STEPS",
        payload: { steps: completed },
      });
      expect(store.getSnapshot().completedSteps.has("step1")).toBe(true);
  });

  test("handle VALIDATE_START and VALIDATE_END", () => {
    store.dispatch({
      type: "VALIDATE_START",
      payload: { stepId: "step1" },
    });
    expect(store.getSnapshot().busySteps.has("step1")).toBe(true);

    store.dispatch({
      type: "VALIDATE_END",
      payload: { 
          stepId: "step1", 
          result: { isValid: false, errors: { field: "error" } } 
      },
    });
    expect(store.getSnapshot().busySteps.has("step1")).toBe(false);
  });
  
  test("DevTools Middleware Serialization", () => {
       const mockDevTools = {
           init: vi.fn(),
           send: vi.fn(),
           subscribe: vi.fn(),
           unsubscribe: vi.fn(),
           error: vi.fn()
       };
       (window as any).__REDUX_DEVTOOLS_EXTENSION__ = {
           connect: () => mockDevTools
       };

       const storeWithDevTools = new WizardStore(initialData, [devToolsMiddleware]);
       
       const tempSet = new Set(['step1']);
       storeWithDevTools.dispatch({
           type: 'SET_VISITED_STEPS',
           payload: { steps: tempSet }
       });

       expect(mockDevTools.send).toHaveBeenCalled();
       const sendCall = mockDevTools.send.mock.calls.find(call => call[0].type === 'SET_VISITED_STEPS');
       expect(sendCall).toBeDefined();
       
       // Check snapshot in the send call
       const snapshot = sendCall?.[1];
       expect(Array.isArray(snapshot?.visitedSteps)).toBe(true);
       expect(snapshot?.visitedSteps).toContain('step1');
  });
});
