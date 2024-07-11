/// <reference types="node" />
import type { PipelineSource } from 'node:stream';
export interface HandlerResponse {
    statusCode: number;
    headers?: {
        [header: string]: boolean | number | string;
    };
    multiValueHeaders?: {
        [header: string]: ReadonlyArray<boolean | number | string>;
    };
    body?: string;
    isBase64Encoded?: boolean;
}
export interface BuilderResponse extends HandlerResponse {
    ttl?: number;
}
export interface StreamingResponse extends Omit<HandlerResponse, 'body'> {
    body?: string | PipelineSource<any>;
}
