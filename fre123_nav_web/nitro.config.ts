export default defineNitroConfig({
  devProxy: {
    '/api': {
      target: process.env.NUXT_BACKEND_API,
      changeOrigin: true,
      rewrite: (path: string) => path.replace('/api', ''),
    },
  },
})
