import type { Hookable } from 'hookable';
import type { HookInfo } from '../../types';
export declare function setupHooksDebug<T extends Hookable<any>>(hooks: T): Record<string, HookInfo>;
