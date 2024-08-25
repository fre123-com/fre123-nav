declare const _default: import("../nuxt").Plugin<Record<string, unknown>> & import("../nuxt").ObjectPlugin<Record<string, unknown>>;
export default _default;
declare global {
    interface Document {
        startViewTransition?: (callback: () => Promise<void> | void) => {
            finished: Promise<void>;
            updateCallbackDone: Promise<void>;
            ready: Promise<void>;
        };
    }
}
