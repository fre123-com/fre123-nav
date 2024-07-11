
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['icon']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['icon']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['icon']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['icon']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
