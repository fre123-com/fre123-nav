import { R as ResourceMeta, M as Manifest } from './types-657d8684.js';

interface ModuleDependencies {
    scripts: Record<string, ResourceMeta>;
    styles: Record<string, ResourceMeta>;
    preload: Record<string, ResourceMeta>;
    prefetch: Record<string, ResourceMeta>;
}
interface SSRContext {
    renderResourceHints?: Function;
    renderScripts?: Function;
    renderStyles?: Function;
    modules?: Set<string>;
    _registeredComponents?: Set<string>;
    _requestDependencies?: ModuleDependencies;
    [key: string]: any;
}
interface RenderOptions {
    buildAssetsURL?: (id: string) => string;
    manifest: Manifest;
}
interface RendererContext extends Required<RenderOptions> {
    _dependencies: Record<string, ModuleDependencies>;
    _dependencySets: Record<string, ModuleDependencies>;
    _entrypoints: string[];
    updateManifest: (manifest: Manifest) => void;
}
interface LinkAttributes {
    rel: string | null;
    href: string;
    as?: string | null;
    type?: string | null;
    crossorigin?: '' | null;
}
declare function createRendererContext({ manifest, buildAssetsURL }: RenderOptions): RendererContext;
declare function getModuleDependencies(id: string, rendererContext: RendererContext): ModuleDependencies;
declare function getAllDependencies(ids: Set<string>, rendererContext: RendererContext): ModuleDependencies;
declare function getRequestDependencies(ssrContext: SSRContext, rendererContext: RendererContext): ModuleDependencies;
declare function renderStyles(ssrContext: SSRContext, rendererContext: RendererContext): string;
declare function getResources(ssrContext: SSRContext, rendererContext: RendererContext): LinkAttributes[];
declare function renderResourceHints(ssrContext: SSRContext, rendererContext: RendererContext): string;
declare function renderResourceHeaders(ssrContext: SSRContext, rendererContext: RendererContext): Record<string, string>;
declare function getPreloadLinks(ssrContext: SSRContext, rendererContext: RendererContext): LinkAttributes[];
declare function getPrefetchLinks(ssrContext: SSRContext, rendererContext: RendererContext): LinkAttributes[];
declare function renderScripts(ssrContext: SSRContext, rendererContext: RendererContext): string;
type RenderFunction = (ssrContext: SSRContext, rendererContext: RendererContext) => any;
declare function createRenderer(createApp: any, renderOptions: RenderOptions & {
    renderToString: Function;
}): {
    rendererContext: RendererContext;
    renderToString(ssrContext: SSRContext): Promise<{
        html: any;
        renderResourceHeaders: () => Record<string, string>;
        renderResourceHints: () => string;
        renderStyles: () => string;
        renderScripts: () => string;
    }>;
};

export { ModuleDependencies, RenderFunction, RenderOptions, RendererContext, SSRContext, createRenderer, createRendererContext, getAllDependencies, getModuleDependencies, getPrefetchLinks, getPreloadLinks, getRequestDependencies, getResources, renderResourceHeaders, renderResourceHints, renderScripts, renderStyles };
