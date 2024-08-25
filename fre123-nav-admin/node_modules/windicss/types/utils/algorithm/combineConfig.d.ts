export default function combineConfig(a: {
    [key: string]: unknown;
}, b: {
    [key: string]: unknown;
}, arrayMergeDepth?: number): {
    [key: string]: unknown;
};
