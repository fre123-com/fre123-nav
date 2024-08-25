import type { Processor } from '../lib';
export declare function generateCompletions(processor: Processor): {
    static: string[];
    color: string[];
    dynamic: string[];
};
