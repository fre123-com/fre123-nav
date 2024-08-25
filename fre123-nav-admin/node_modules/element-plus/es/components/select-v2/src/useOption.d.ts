import type { IOptionV2Props } from './token';
export declare function useOption(props: IOptionV2Props, { emit }: {
    emit: any;
}): {
    hoverItem: () => void;
    selectOptionClick: () => void;
};
