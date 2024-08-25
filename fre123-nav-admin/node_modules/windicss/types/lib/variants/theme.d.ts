import { Style } from '../../utils/style';
import { DarkModeConfig } from '../../interfaces';
export declare function generateThemes(darkMode?: DarkModeConfig): {
    [key: string]: () => Style;
};
