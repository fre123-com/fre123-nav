import { generateOrientations } from './orientation';
import { generateScreens } from './screen';
import { generateThemes } from './theme';
import { generateStates } from './state';
import type { Style } from '../../utils/style';
import type { Config } from '../../interfaces';
export declare type Variants = {
    orientation: {
        [key: string]: () => Style;
    };
    screen: {
        [key: string]: () => Style;
    };
    theme: {
        [key: string]: () => Style;
    };
    state: {
        [key: string]: () => Style;
    };
};
export declare function resolveVariants(config: Config): Variants;
export { generateOrientations, generateScreens, generateThemes, generateStates, };
