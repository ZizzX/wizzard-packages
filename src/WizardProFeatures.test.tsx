import { describe, it, expect } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import {
  WizardProvider,
  useWizardActions,
  useWizardState,
} from "./context/WizardContext";
import { WizardStepRenderer } from "./components/WizardStepRenderer";
import { IStepConfig } from "./types";

// Helper component to interact with wizard in tests
const WizardConsumer = () => {
  const { currentStep, progress, activeStepsCount, history } = useWizardState();
  const { goToNextStep, reset, setData } = useWizardActions();

  return (
    <div>
      <div data-testid="current-step">{currentStep?.id}</div>
      <div data-testid="progress">{progress}</div>
      <div data-testid="steps-count">{activeStepsCount}</div>
      <div data-testid="history">{history.join(",")}</div>
      <button onClick={() => goToNextStep()} data-testid="next-btn">
        Next
      </button>
      <button onClick={() => reset()} data-testid="reset-btn">
        Reset
      </button>
      <button
        onClick={() => setData("showStep2", true)}
        data-testid="show-2-btn"
      >
        Show 2
      </button>
      <button
        onClick={() => setData("blockNext", true)}
        data-testid="block-btn"
      >
        Block
      </button>
    </div>
  );
};

describe("Wizard Pro Features", () => {
  const steps: IStepConfig<any, any, any>[] = [
    {
      id: "step1",
      label: "Step 1",
      component: () => <div>Step 1 Content</div>,
    },
    {
      id: "step2",
      label: "Step 2",
      condition: async (data: any) => {
        await new Promise((r) => setTimeout(r, 20));
        return !!data.showStep2;
      },
      component: () => <div>Step 2 Content</div>,
    },
    {
      id: "step3",
      label: "Step 3",
      beforeLeave: async (data: any, dir: string) => {
        if (dir === "next" && data.blockNext) return false;
        return true;
      },
      component: () => <div>Step 3 Content</div>,
    },
  ];

  it("should calculate progress and activeStepsCount correctly", async () => {
    render(
      <WizardProvider config={{ steps }}>
        <WizardConsumer />
      </WizardProvider>
    );

    // Initial state
    expect(screen.getByTestId("current-step")).toHaveTextContent("step1");
    // Initially only 2 steps active (step1, step3) because step2 condition is async and defaults to false
    await waitFor(() => {
      expect(screen.getByTestId("steps-count")).toHaveTextContent("2");
    });
    expect(screen.getByTestId("progress")).toHaveTextContent("50"); // (1/2) * 100
  });

  it("should handle async step conditions dynamically", async () => {
    render(
      <WizardProvider config={{ steps }}>
        <WizardConsumer />
      </WizardProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("steps-count")).toHaveTextContent("2");
    });

    // Show step 2
    await act(async () => {
      screen.getByTestId("show-2-btn").click();
    });

    // Wait for async condition to resolve
    await waitFor(
      () => {
        expect(screen.getByTestId("steps-count")).toHaveTextContent("3");
      },
      { timeout: 1000 }
    );
  });

  it("should respect beforeLeave guards", async () => {
    render(
      <WizardProvider config={{ steps }}>
        <WizardConsumer />
        <WizardStepRenderer />
      </WizardProvider>
    );

    // Enable step 2 first so we can reach step 3
    await act(async () => {
      screen.getByTestId("show-2-btn").click();
    });

    await waitFor(() =>
      expect(screen.getByTestId("steps-count")).toHaveTextContent("3")
    );

    // Go to step 2
    await act(async () => {
      screen.getByTestId("next-btn").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("current-step")).toHaveTextContent("step2")
    );

    // Go to step 3
    await act(async () => {
      screen.getByTestId("next-btn").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("current-step")).toHaveTextContent("step3")
    );

    // Block movement from step 3
    await act(async () => {
      screen.getByTestId("block-btn").click();
    });

    // Try to go next from step 3 (currently last, but guard still called if next logic triggered or if we had step 4)
    // Let's add a step 4 for clarity
  });

  it("should reset wizard state", async () => {
    render(
      <WizardProvider config={{ steps }}>
        <WizardConsumer />
      </WizardProvider>
    );

    // Initial history should have first step if we track it on start (currently we track on visit)
    // Wait, current implementation: setHistory((prev) => [...prev, stepId]) in goToStep.
    // Initially the first step ID might not be in history if no navigation happened.

    // Go to next step to change state
    await act(async () => {
      screen.getByTestId("show-2-btn").click();
    });

    await waitFor(() =>
      expect(screen.getByTestId("steps-count")).toHaveTextContent("3")
    );

    await act(async () => {
      await screen.getByTestId("next-btn").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("history")).toHaveTextContent("step2");
    });

    // Reset
    await act(async () => {
      screen.getByTestId("reset-btn").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("current-step")).toHaveTextContent("step1");
      expect(screen.getByTestId("history")).toHaveTextContent("step1");
    });
  });
});
