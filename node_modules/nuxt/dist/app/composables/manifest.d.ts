import type { MatcherExport } from 'radix3';
export interface NuxtAppManifestMeta {
    id: string;
    timestamp: number;
}
export interface NuxtAppManifest extends NuxtAppManifestMeta {
    matcher: MatcherExport;
    prerendered: string[];
}
export declare function getAppManifest(): Promise<NuxtAppManifest>;
export declare function getRouteRules(url: string): Promise<Record<string, any>>;
