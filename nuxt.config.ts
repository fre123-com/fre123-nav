import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-icon',
		'@pinia-plugin-persistedstate/nuxt',
	],
	pinia: {
		autoImports: ['defineStore', 'storeToRefs'],
	},
	alias: {
		'@': path.resolve(__dirname, 'src'),
	},
	app: {
		head: {
			link: [
				{
					rel: 'icon',
					// size: '32x32',
					type: 'image/x-icon',
					href: 'https://img.fre123.com/i/2023/11/25/65619e791f166.ico',
				},
			],
			meta: [
				{
					name: 'keywords',
					content:
						'FRE123, 免费资源, 优质资源, 资源聚合, 在线资源, 影视资源, 动漫番剧, 软件工具, 网盘资源',
				},
				{
					name: 'description',
					content:
						'FRE123 专注于为您提供各种免费优质资源，包括影视资源、动漫番剧、软件工具等。无论您在寻找哪种资源，我们都将尽力为您提供，为您的学习或工作助力',
				},
			],
		},
		buildAssetsDir: '/fre/',
	},

	vite: {
		// 预处理，全局可用
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import 'assets/_variables.scss';`,
				},
			},
		},
		esbuild: {
			drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
		},
	},
	experimental: {
		writeEarlyHints: false,
		inlineSSRStyles: false,
	},
	css: [
		'~/assets/global.scss',
		'~/assets/tailwind.css',
		'@fortawesome/fontawesome-svg-core/styles.css',
	],
	build: {
		transpile: [
			'@fortawesome/vue-fontawesome',
			'@fortawesome/fontawesome-svg-core',
			'@fortawesome/pro-solid-svg-icons',
			'@fortawesome/pro-regular-svg-icons',
			'@fortawesome/free-brands-svg-icons',
		],
	},

	devtools: { enabled: process.env.NODE_ENV === 'development' ? true : false },
})
