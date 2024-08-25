<!--
 * @Description: 
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-01-16 10:35:34
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-22 20:52:08
 * 2024-01-16 10:35:34
-->
<template>
	<NuxtLayout>
		<NuxtPage />
		<Surprise></Surprise>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { CONFIG_KEY_SEO, getSiteConfigItem } from './stores/config'

const seoInfo = await getSiteConfigItem(CONFIG_KEY_SEO)
// 初始化 SEO_TITLE 模板和主题

const scripts: any[] = []
if (seoInfo?.ID) {
	scripts.push({
		src: `https://hm.baidu.com/hm.js?${seoInfo?.ID}`,
		defer: true,
		mode: 'client',
	})
}

useHead({
	titleTemplate: (s) => {
		return s ? `${s} - ${seoInfo?.title}` : `${seoInfo?.title}`
	},
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: seoInfo?.icon,
		},
	],
	meta: [
		{
			name: 'keywords',
			content: seoInfo?.keywords,
		},
		{
			name: 'description',
			content: seoInfo?.description,
		},
	],
	script: scripts,
	bodyAttrs: {
		class: 'bg-base',
	},
})
</script>
