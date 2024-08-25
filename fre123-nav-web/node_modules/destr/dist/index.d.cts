type Options = {
    strict?: boolean;
};
declare function destr<T = unknown>(value: any, options?: Options): T;
declare function safeDestr<T = unknown>(value: any, options?: Options): T;

export { type Options, destr as default, destr, safeDestr };
