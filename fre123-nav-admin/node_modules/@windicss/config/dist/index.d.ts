import { FullConfig } from 'windicss/types/interfaces';
export { FullConfig as WindiCssOptions } from 'windicss/types/interfaces';

declare const defaultConfigureFiles: string[];
interface LoadConfigurationOptions {
    /**
     * Name for debug
     *
     * @default 'windicss-config'
     * @internal
     */
    name?: string;
    /**
     * Config object or path
     */
    config?: FullConfig | string;
    /**
     * CWD
     *
     * @default process.cwd
     * @internal
     */
    root?: string;
    /**
     * A list of filename of paths to search of config files
     */
    configFiles?: string[];
    /**
     * On loading configuration error
     *
     * @default [throw error]
     */
    onConfigurationError?: (error: unknown) => void;
    /**
     * On configure file not found
     *
     * @default [emit warning]
     */
    onConfigurationNotFound?: (filepath: string) => void;
}
declare function loadConfiguration(options: LoadConfigurationOptions): {
    config: FullConfig;
    filepath?: string;
    error?: unknown;
};

export { LoadConfigurationOptions, defaultConfigureFiles, loadConfiguration };
