import fg from 'fast-glob';
export declare function globArray(patterns: string[], options?: fg.Options): string[];
export declare function getVersion(): string;
export declare function fuzzy(content: string): string[];
export declare function generateTemplate(folder: string, outputPath?: string): {
    html: string;
    css: string;
};
