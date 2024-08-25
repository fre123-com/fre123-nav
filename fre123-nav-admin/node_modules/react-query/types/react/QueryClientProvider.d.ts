import React from 'react';
import { QueryClient } from '../core';
declare global {
    interface Window {
        ReactQueryClientContext?: React.Context<QueryClient | undefined>;
    }
}
export declare const useQueryClient: () => QueryClient;
export interface QueryClientProviderProps {
    client: QueryClient;
    contextSharing?: boolean;
    children?: React.ReactNode;
}
export declare const QueryClientProvider: ({ client, contextSharing, children, }: QueryClientProviderProps) => JSX.Element;
