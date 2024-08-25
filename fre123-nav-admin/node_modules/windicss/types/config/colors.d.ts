declare type Colors = 'inherit' | 'current' | 'transparent' | 'black' | 'white' | 'rose' | 'pink' | 'fuchsia' | 'purple' | 'violet' | 'indigo' | 'blue' | 'lightBlue' | 'sky' | 'cyan' | 'teal' | 'emerald' | 'green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'red' | 'warmGray' | 'trueGray' | 'gray' | 'coolGray' | 'blueGray' | 'slate' | 'zink' | 'zinc' | 'neutral' | 'stone' | 'dark' | 'light';
export declare type DefaultColors = {
    [key in Colors]: string | Record<number | string, string>;
};
export declare const colors: DefaultColors;
export {};
