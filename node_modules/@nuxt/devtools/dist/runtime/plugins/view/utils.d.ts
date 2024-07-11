import type { Ref } from 'vue';
export declare function useObjectStorage<T>(key: string, initial: T, listenToStorage?: boolean): Ref<T>;
export declare function useTransform<F, T>(data: Ref<F>, to: (data: F) => T, from: (data: T) => F): Ref<T>;
export declare function useEventListener(target: EventTarget, type: string, listener: any, options?: boolean | AddEventListenerOptions): void;
/**
 * @see https://vueuse.org/useElementBounding
 */
export declare function useElementBounding(target: Ref<HTMLElement | null | undefined>): {
    height: Ref<number>;
    bottom: Ref<number>;
    left: Ref<number>;
    right: Ref<number>;
    top: Ref<number>;
    width: Ref<number>;
    x: Ref<number>;
    y: Ref<number>;
    update: () => void;
};
export declare function millisecondToHumanreadable(ms: number): [number, string];
/**
 * Reactive `env(safe-area-inset-*)`
 *
 * @see https://vueuse.org/useScreenSafeArea
 */
export declare function useScreenSafeArea(): {
    top: Ref<number>;
    right: Ref<number>;
    bottom: Ref<number>;
    left: Ref<number>;
    update: () => void;
};
