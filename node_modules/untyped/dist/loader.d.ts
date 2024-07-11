import jiti from 'jiti';
import { S as Schema } from './types-a304c6a0.js';

type JITIOptions = Parameters<typeof jiti>[1];
interface LoaderOptions {
    jiti?: JITIOptions;
    defaults?: Record<string, any>;
    ignoreDefaults?: boolean;
}
declare function loadSchema(entryPath: string, options?: LoaderOptions): Promise<Schema>;

export { LoaderOptions, loadSchema };
