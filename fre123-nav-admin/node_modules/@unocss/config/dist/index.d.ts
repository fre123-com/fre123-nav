import { UserConfig, UserConfigDefaults } from '@unocss/core';
import { LoadConfigSource, LoadConfigResult } from 'unconfig';
export { LoadConfigResult, LoadConfigSource } from 'unconfig';

declare function loadConfig<U extends UserConfig>(cwd?: string, configOrPath?: string | U, extraConfigSources?: LoadConfigSource[], defaults?: UserConfigDefaults): Promise<LoadConfigResult<U>>;

export { loadConfig };
