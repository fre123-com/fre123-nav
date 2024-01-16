/**
 * Nuxt生命周期钩子分为三类
 * 1. Nuxt钩子
 * 2. Vue App 钩子
 * 3. Nitro App 钩子
 * 具体文档参照 https://nuxt.com/docs/api/advanced/hooks
 */

// vue app 钩子
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('app:created', (vueApp) => {
		// vue app创建时
		inject('title', 'Custom Page Title')
	})
	nuxtApp.hook('app:error', (vueApp) => {
		// 可以这里修改vue实例
	})
})
