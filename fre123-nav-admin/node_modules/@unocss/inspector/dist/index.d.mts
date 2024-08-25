import { Plugin } from 'vite';
import { UnocssPluginContext } from '@unocss/core';

declare function UnocssInspector(ctx: UnocssPluginContext): Plugin;

export { UnocssInspector as default };
