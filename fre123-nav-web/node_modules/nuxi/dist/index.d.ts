declare const main: any;

declare const runMain: () => Promise<void>;
declare function runCommand(name: string, argv?: string[], data?: {
    overrides?: Record<string, any>;
}): Promise<{
    result: unknown;
}>;

export { main, runCommand, runMain };
