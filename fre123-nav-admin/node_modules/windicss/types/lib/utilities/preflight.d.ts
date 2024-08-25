import type { ThemeUtil } from '../../interfaces';
export declare const preflights: {
    keys: string[];
    properties: {
        [key: string]: string | string[] | ((theme: ThemeUtil) => string);
    };
    selector?: string;
    global?: boolean;
}[];
