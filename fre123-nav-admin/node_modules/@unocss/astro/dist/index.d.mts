import { AstroIntegration } from 'astro';
import { VitePluginConfig } from '@unocss/vite';
import { UserConfigDefaults } from '@unocss/core';

interface AstroIntegrationConfig<Theme extends object = object> extends VitePluginConfig<Theme> {
    /**
     * Include reset styles
     * When passing `true`, `@unocss/reset/tailwind.css` will be used
     * @default false
     */
    injectReset?: string | boolean;
    /**
     * Inject UnoCSS entry import for every astro page
     * @default true
     */
    injectEntry?: boolean | string;
    /**
     * Inject extra imports for every astro page
     * @default []
     */
    injectExtra?: string[];
}
declare function UnoCSSAstroIntegration<Theme extends object>(options?: AstroIntegrationConfig<Theme>, defaults?: UserConfigDefaults): AstroIntegration;

export { type AstroIntegrationConfig, UnoCSSAstroIntegration as default };
