import { Style } from '../../utils/style';
declare type RawBreakpoint = {
    raw: string;
};
declare type MinMaxBreakpoint = {
    min?: string;
    max?: string;
};
declare type ScreenBreakpoint = RawBreakpoint | MinMaxBreakpoint;
export declare function generateScreens(screens: {
    [key: string]: string | ScreenBreakpoint;
}): {
    [key: string]: () => Style;
};
export {};
