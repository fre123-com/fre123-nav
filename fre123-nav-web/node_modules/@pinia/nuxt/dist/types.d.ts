
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['pinia']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pinia']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['pinia']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['pinia']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
