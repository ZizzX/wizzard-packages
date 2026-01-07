import type { WizardMiddleware } from "../types";

/**
 * Helper to sanitize data for Redux DevTools.
 */
const serializeForDevTools = (data: any): any => {
    if (data instanceof Set) {
        return Array.from(data);
    }
    if (data instanceof Map) {
        return Object.fromEntries(data);
    }
    if (typeof data === "function") {
        return "[Function]";
    }
    if (Array.isArray(data)) {
        return data.map(serializeForDevTools);
    }
    if (typeof data === "object" && data !== null) {
        if ("steps" in data && Array.isArray(data.steps) && "persistence" in data) {
            return {
                ...data,
                steps: data.steps.map((s: any) => ({
                    ...s,
                    id: s.id,
                    label: s.label,
                    condition: s.condition ? "[Function]" : undefined,
                    component: s.component ? "[Component]" : undefined,
                }))
            };
        }

        const result: any = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = serializeForDevTools(data[key]);
            }
        }
        return result;
    }
    return data;
};

/**
 * Middleware for Redux DevTools integration
 */
export const devToolsMiddleware: WizardMiddleware<any, any> = (api) => {
    const globalContext: any = typeof window !== "undefined" ? window : globalThis;

    if (!globalContext.__REDUX_DEVTOOLS_EXTENSION__) {
        return (next) => (action) => next(action);
    }

    const devTools = globalContext.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: "Wizard Stepper React",
        features: {
            pause: true,
            lock: true,
            persist: true,
            export: true,
            import: 'custom',
            jump: true,
            skip: true,
            reorder: true,
            dispatch: true,
            test: true
        }
    });

    devTools.init(serializeForDevTools(api.getSnapshot()));

    return (next) => (action) => {
        const result = next(action);
        const snapshot = api.getSnapshot();

        const serializedSnapshot = serializeForDevTools(snapshot);
        const serializedAction = serializeForDevTools(action);

        devTools.send(serializedAction, serializedSnapshot);
        return result;
    };
};
