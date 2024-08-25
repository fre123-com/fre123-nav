type OptionsType = {
  modelValue?: boolean;
  list: Array<unknown>;
  step?: number;
  limitScrollNum?: number;
  hover?: boolean;
  direction?: "up" | "down" | "left" | "right";
  singleHeight?: number;
  singleWidth?: number;
  singleWaitTime?: number;
  isRemUnit?: boolean;
  isWatch?: boolean;
  delay?: number;
  ease?: "ease-in" | "linear" | "ease" | "ease-out" | "ease-in-out" | {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  };
  count?: number;
  copyNum?: number;
  wheel?: boolean;
}

declare module 'vue3-seamless-scroll' {
  export const Vue3SeamlessScroll: import('vue').DefineComponent < OptionsType, OptionsType, OptionsType, OptionsType, OptionsType,
    OptionsType, OptionsType, OptionsType, OptionsType, OptionsType, OptionsType, OptionsType >

  const install: (app: import('vue').App, options: {
    name: string
  }) => unknown;
  export default install;
}
