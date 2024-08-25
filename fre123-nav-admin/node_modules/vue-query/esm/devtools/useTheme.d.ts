declare const theme: {
    background: string;
    backgroundAlt: string;
    foreground: string;
    gray: string;
    grayAlt: string;
    inputBackgroundColor: string;
    inputTextColor: string;
    success: string;
    danger: string;
    active: string;
    warning: string;
};
export declare type Theme = typeof theme;
export declare const VUE_QUERY_DEVTOOLS_THEME = "VUE_QUERY_DEVTOOLS_THEME";
export declare function useTheme(): Theme;
export {};
