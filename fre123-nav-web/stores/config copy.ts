/*
 * @Description:
 * @Author: Damnnnnnnn
 * @Date: 2024-01-16 10:35:34
 * @LastEditors: Damnnnnnnn
 * @LastEditTime: 2024-08-23 02:05:27
 */
// import webConfig from '../config/website.json'

import type { IGlobalConfig } from '~/interface/site'

export const CONFIG_BUSINESS_KEY_SITE = 'site'
export const CONFIG_BUSINESS_KEY_SURPRISE = 'surprise'
export const CONFIG_BUSINESS_KEY_NAV = 'nav'
export const CONFIG_BUSINESS_KEY_FRIENDSHIP_LINK = 'friendship_links'

export const CONFIG_KEY_BASE = 'base'
export const CONFIG_KEY_SEO = 'seo'
export const CONFIG_KEY_HERDER = 'header'
export const CONFIG_KEY_PENDANT = 'pendant'
export const CONFIG_KEY_FOOTER = 'footer'

export const getGlobalConfig = async () => {
	const runtimeConfig = useRuntimeConfig()
	if (runtimeConfig.public.isApi) {
		const backendHost = process.server ? process.env.NUXT_BACKEND_API : ''
		if (process.server && !backendHost) {
			throw new Error('NUXT_BACKEND_API is not defined')
		}
		const { data } = await postApi<IGlobalConfig>('/v1/config/get', {
			body: {},
		})
		// console.log('正在通过 API 获取数据...', data.value)
		return data.value
	}

	console.log('正在获取本地数据...')
	try {
		let globalConfig = require('../config/data.json')
		return globalConfig
	} catch (e) {
		// 兼容之前版本多 json 配置的版本
		console.log('正在获取旧数据...')
		const websiteData = require('../config/website.json')
		const resourceData = require('../config/resource.json')
		const navData = require('../config/nav.json')
		const header = {
			search_engine: resourceData,
			right: [websiteData.header.right],
		}
		// const data = {
		// 	site: [
		// 		{
		// 			base: websiteData.base,
		// 		},
		// 		{
		// 			seo: websiteData.seo,
		// 		},
		// 		{
		// 			header: header,
		// 		},
		// 		{
		// 			pendant: websiteData.pendant,
		// 		},
		// 		{
		// 			footer: websiteData.footer,
		// 		},
		// 	],
		// 	nav: navData,
		// 	surprise: [],
		// 	friendship_links: [],
		// }
		return data
	}
}

export const getBusinessConfig = async (key: string) => {
	const globalConfig = await getGlobalConfig()
	return globalConfig?.[key]
}

// 获取配置信息
export const getSiteConfigItem = async (key: string) => {
	const siteConfig = await getBusinessConfig(CONFIG_BUSINESS_KEY_SITE)
	if (siteConfig?.findLastIndex((item) => Object.keys(item)[0] === key) == -1) {
		return createError('无法获取配置信息')
	}
	return siteConfig?.find((item) => Object.keys(item)[0] === key)?.[key]
}
