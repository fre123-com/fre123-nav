import React from 'react';
import { HydrateOptions } from '../core';
export declare function useHydrate(state: unknown, options?: HydrateOptions): void;
export interface HydrateProps {
    state?: unknown;
    options?: HydrateOptions;
    children?: React.ReactNode;
}
export declare const Hydrate: ({ children, options, state }: HydrateProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
