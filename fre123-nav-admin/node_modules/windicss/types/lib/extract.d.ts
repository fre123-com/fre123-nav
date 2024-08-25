import { Style } from '../utils/style';
import type { Processor } from './index';
export declare function generateStaticStyle(processor: Processor, className: string, addComment?: boolean): Style | undefined;
export default function extract(processor: Processor, className: string, addComment?: boolean, prefix?: string): Style | Style[] | undefined;
