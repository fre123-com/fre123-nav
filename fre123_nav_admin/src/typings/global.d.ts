// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    title: string
    icon?: string
    isLink?: string
    close?: boolean
    children?: MenuOptions[]
  }
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PROXY_TARGET_QUARK: any
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
  VITE_PROXY_TARGET: string
  VITE_PROXY_TARGET_WX: string
  VITE_API_BASE_URL: string
  VITE_API_WX_BASE_URL: string
  VITE_API_QUARK_BASE_URL: string
  VITE_UPLOAD_API_URL: string
  VITE_BASE: string
}
