export { colors } from './colors.mjs';
export { t as theme } from './shared/preset-mini.Cu-XLFZP.mjs';
import { T as Theme } from './shared/preset-mini.P5Rzuhf5.mjs';
export { C as Colors, a as ThemeAnimation } from './shared/preset-mini.P5Rzuhf5.mjs';
import '@unocss/core';

declare const blur: {
    DEFAULT: string;
    '0': string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
};
declare const dropShadow: {
    DEFAULT: string[];
    sm: string;
    md: string[];
    lg: string[];
    xl: string[];
    '2xl': string;
    none: string;
};

declare const fontFamily: {
    sans: string;
    serif: string;
    mono: string;
};
declare const fontSize: Theme['fontSize'];
declare const textIndent: Theme['textIndent'];
declare const textStrokeWidth: Theme['textStrokeWidth'];
declare const textShadow: {
    DEFAULT: string[];
    none: string;
    sm: string;
    md: string[];
    lg: string[];
    xl: string[];
};
declare const lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
};
declare const letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
};
declare const fontWeight: {
    thin: string;
    extralight: string;
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
};
declare const wordSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
};

declare const breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
};
declare const verticalBreakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
};
declare const lineWidth: {
    DEFAULT: string;
    none: string;
};
declare const spacing: {
    DEFAULT: string;
    none: string;
    xs: string;
    sm: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
};
declare const duration: {
    DEFAULT: string;
    none: string;
    75: string;
    100: string;
    150: string;
    200: string;
    300: string;
    500: string;
    700: string;
    1000: string;
};
declare const borderRadius: {
    DEFAULT: string;
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
};
declare const boxShadow: {
    DEFAULT: string[];
    none: string;
    sm: string;
    md: string[];
    lg: string[];
    xl: string[];
    '2xl': string;
    inner: string;
};
declare const easing: {
    DEFAULT: string;
    linear: string;
    in: string;
    out: string;
    'in-out': string;
};
declare const ringWidth: {
    DEFAULT: string;
    none: string;
};
declare const zIndex: {
    auto: string;
};
declare const media: {
    mouse: string;
};

declare const preflightBase: {
    '--un-ring-inset': string;
    '--un-ring-offset-width': string;
    '--un-ring-offset-color': string;
    '--un-ring-width': string;
    '--un-ring-color': string;
    '--un-shadow': string;
    '--un-ring-offset-shadow': string;
    '--un-ring-shadow': string;
    '--un-shadow-inset': string;
    '--un-rotate': number;
    '--un-rotate-x': number;
    '--un-rotate-y': number;
    '--un-rotate-z': number;
    '--un-scale-x': number;
    '--un-scale-y': number;
    '--un-scale-z': number;
    '--un-skew-x': number;
    '--un-skew-y': number;
    '--un-translate-x': number;
    '--un-translate-y': number;
    '--un-translate-z': number;
};

declare const baseSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    prose: string;
};
declare const width: {
    screen: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    prose: string;
    auto: string;
};
declare const maxWidth: {
    screen: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    prose: string;
    none: string;
};
declare const height: {
    screen: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    prose: string;
    auto: string;
};
declare const maxHeight: {
    screen: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    prose: string;
    none: string;
};
declare const containers: {
    [k: string]: string;
};

export { Theme, baseSize, blur, borderRadius, boxShadow, breakpoints, containers, dropShadow, duration, easing, fontFamily, fontSize, fontWeight, height, letterSpacing, lineHeight, lineWidth, maxHeight, maxWidth, media, preflightBase, ringWidth, spacing, textIndent, textShadow, textStrokeWidth, verticalBreakpoints, width, wordSpacing, zIndex };
