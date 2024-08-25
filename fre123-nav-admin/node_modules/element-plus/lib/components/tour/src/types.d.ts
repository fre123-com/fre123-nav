import type { CSSProperties, VNode } from 'vue';
import type { ButtonProps } from 'element-plus/es/components/button';
export declare type TourMask = boolean | {
    style?: CSSProperties;
    color?: string;
};
export interface TourGap {
    offset?: number | [number, number];
    radius?: number;
}
export declare type TourBtnProps = {
    children?: VNode | string;
    onClick?: () => void;
} & Partial<ButtonProps> & Record<string, any>;
export interface PosInfo {
    left: number;
    top: number;
    height: number;
    width: number;
    radius: number;
}
