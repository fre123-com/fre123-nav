export type DefaultMessages = Record<string, string | boolean | number >
declare const template: (data: Partial<DefaultMessages>) => string
export { template }