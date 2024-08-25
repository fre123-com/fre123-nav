/** Mark some properties as required, leaving others unchanged */
declare type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;
interface CliOptions {
    cwd?: string;
    patterns?: Array<string>;
    outFile?: string;
    watch?: boolean;
    config?: string;
    stdout?: boolean;
    writeTransformed?: boolean;
    preflights?: boolean;
    minify?: boolean;
}
type ResolvedCliOptions = MarkRequired<CliOptions, 'patterns'>;

declare function resolveOptions(options: CliOptions): Promise<ResolvedCliOptions>;
declare function build(_options: CliOptions): Promise<void>;

export { build, resolveOptions };
