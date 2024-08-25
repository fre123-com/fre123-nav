import { Style } from '../../utils/style';
export declare function generateOrientations(orientations: {
    [key: string]: string;
}): {
    [key: string]: () => Style;
};
