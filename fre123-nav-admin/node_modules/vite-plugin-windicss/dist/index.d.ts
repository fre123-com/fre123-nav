import { Plugin } from 'vite';
import { UserOptions, WindiPluginUtilsOptions } from '@windicss/plugin-utils';
export * from '@windicss/plugin-utils';

declare function VitePluginWindicss(userOptions?: UserOptions, utilsOptions?: WindiPluginUtilsOptions): Plugin[];

export { VitePluginWindicss as default };
