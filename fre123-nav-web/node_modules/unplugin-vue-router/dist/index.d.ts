import * as unplugin from 'unplugin';
import { R as ResolvedOptions, S as ServerContext, O as Options } from './options-8dbadba3.js';
export { D as DEFAULT_OPTIONS, E as EditableTreeNode, T as TreeNode, d as TreeNodeValueParam, e as TreeNodeValueStatic, c as createPrefixTree, b as createTreeNodeValue, g as getFileBasedRouteName, a as getPascalCaseRouteName } from './options-8dbadba3.js';
export { NavigationGuard, ParamValue, ParamValueOneOrMore, ParamValueZeroOrMore, ParamValueZeroOrOne, RouteLocationAsPathTyped, RouteLocationAsPathTypedList, RouteLocationAsRelativeTyped, RouteLocationAsRelativeTypedList, RouteLocationAsString, RouteLocationNormalizedLoadedTyped, RouteLocationNormalizedLoadedTypedList, RouteLocationNormalizedTyped, RouteLocationNormalizedTypedList, RouteLocationResolvedTyped, RouteLocationResolvedTypedList, RouteLocationTyped, RouteLocationTypedList, RouteRecordInfo, RouterLinkPropsTyped, RouterLinkTyped, UseLinkFnTyped, _RouteMapGeneric, _RouterTyped, _UseLinkReturnTyped } from './types.js';
export { a as _DataLoader, D as _DefineLoaderOptions } from './defineLoader-bde635fd.js';
import 'vue-router';
import 'vue';

declare function createRoutesContext(options: ResolvedOptions): {
    scanPages: (startWatchers?: boolean) => Promise<void>;
    writeConfigFiles: () => void;
    setServerContext: (_server: ServerContext) => void;
    stopWatcher: () => void;
    generateRoutes: () => string;
    generateVueRouterProxy: () => string;
    definePageTransform(code: string, id: string): unplugin.Thenable<unplugin.TransformResult>;
};

declare const _default: unplugin.UnpluginInstance<Options | undefined, boolean>;

/**
 * @deprecated use `VueRouterAutoImports` instead
 */
declare const VueRouterExports: Array<string | [string, string]>;
/**
 * Adds useful auto imports to the AutoImport config:
 * @example
 * ```js
 * import { VueRouterAutoImports } from 'unplugin-vue-router'
 *
 * AutoImport({
 *   imports: [VueRouterAutoImports],
 * }),
 * ```
 */
declare const VueRouterAutoImports: Record<string, Array<string | [string, string]>>;

export { Options, VueRouterAutoImports, VueRouterExports, createRoutesContext, _default as default };
