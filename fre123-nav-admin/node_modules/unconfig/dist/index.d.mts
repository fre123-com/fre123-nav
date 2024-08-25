import { L as LoadConfigOptions, a as LoadConfigResult } from './shared/unconfig.e8f60d5d.mjs';
export { B as BuiltinParsers, C as CustomParser, b as LoadConfigSource, S as SearchOptions, d as defaultExtensions } from './shared/unconfig.e8f60d5d.mjs';
import '@antfu/utils';

declare function createConfigLoader<T>(options: LoadConfigOptions): {
    load: (force?: boolean) => Promise<LoadConfigResult<T>>;
    findConfigs: () => Promise<string[]>;
};
declare function loadConfig<T>(options: LoadConfigOptions<T>): Promise<LoadConfigResult<T>>;

export { LoadConfigOptions, LoadConfigResult, createConfigLoader, loadConfig };
