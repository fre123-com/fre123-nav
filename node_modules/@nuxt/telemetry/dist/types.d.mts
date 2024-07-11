
import type { ModuleOptions } from './module'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['telemetry']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['telemetry']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['telemetry']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['telemetry']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module'
