<template>
	<div v-if="currentAdPosition1 || currentAdPosition2">
    <SurpriseBoxCenter v-if="currentAdPosition1" :adData="currentAdPosition1" position="1"/>
    <SurpriseBoxBottomRight v-if="currentAdPosition2" :adData="currentAdPosition2" position="2"/>
	</div>
</template>

<script setup lang="ts">
import type { ISurpriseItem } from '../../interface/surprise'
import { surpriseWebPathMap } from '../../interface/surprise'
/// 广告数据存储
const adDataFromStorage = ref<ISurpriseItem[]>([])
const currentAdPosition1 = ref<ISurpriseItem | null>(null)
const currentAdPosition2 = ref<ISurpriseItem | null>(null)

// 当前时间戳，用于检查广告是否在显示时间范围内
const getCurrentTimestamp = ref(Date.now() / 1000)

// 检查当前页面是否适合显示广告
const isCurrentPageValidForAd = (ad: ISurpriseItem) => {
	const currentPath = window.location.pathname
	// console.log(currentPath)
	return ad.web_path === 'global' || ad.web_path === currentPath
}

onMounted(() => {
	// 组件挂载时加载广告数据
	loadAdsData()

	// 定时更新当前时间戳
	const timer = setInterval(() => {
		getCurrentTimestamp.value = Date.now()
	}, 1000)
	console.log(getCurrentTimestamp.value)
	onUnmounted(() => {
		//组件挂载完成后清空
		clearInterval(timer)
	})
})

// 加载广告数据的函数
const loadAdsData = () => {
	// 确保在客户端执行
	if (typeof window !== 'undefined') {
		const storedData = localStorage.getItem('adsData')
		if (storedData) {
			// 将字符串解析为 ISurpriseItem 类型数组
			adDataFromStorage.value = JSON.parse(storedData) as ISurpriseItem[]
			setLatestAdsByPosition()
		} else {
			console.error('数据获取失败')
		}
	}
}

// 设置最新广告的函数
const setLatestAdsByPosition = () => {
	// 对广告数据按 position 分组并排序，获取 position 1 和 2 的最新广告
	const latestAdsByPosition = getLatestAdsByPosition()
	currentAdPosition1.value =
		latestAdsByPosition[1] && isCurrentPageValidForAd(latestAdsByPosition[1])
			? latestAdsByPosition[1]
			: null
	currentAdPosition2.value =
		latestAdsByPosition[2] && isCurrentPageValidForAd(latestAdsByPosition[2])
			? latestAdsByPosition[2]
			: null
}

// 获取每个广告位（position）下最新的广告
const getLatestAdsByPosition = (): Record<number, ISurpriseItem | null> => {
	// 创建一个空对象，用于存储每个广告位的最新广告
	const latestAdsByPosition = {}

	// 遍历广告数据数组
	adDataFromStorage.value.forEach((ad) => {
		// 检查广告是否符合以下条件：
		// 1. 当前时间在广告的展示时间范围内（start_ts 和 end_ts 之间）。
		// 2. 广告的 is_show 属性为 1，表示广告应该被展示。
		if (
			getCurrentTimestamp.value >= ad.start_ts &&
			getCurrentTimestamp.value <= ad.end_ts &&
			ad.is_show === 1 &&
			isCurrentPageValidForAd(ad)
		) {
			// 如果广告符合条件，检查是否已经有了该广告位的记录
			if (!latestAdsByPosition[ad.position]) {
				// 如果没有，将当前广告设置为该广告位的最新广告
				latestAdsByPosition[ad.position] = ad
			} else {
				// 如果已经有了记录，比较当前广告与记录中广告的 created_at 属性
				// 如果当前广告更新（created_at 更大），则更新记录
				if (latestAdsByPosition[ad.position].created_at < ad.created_at) {
					latestAdsByPosition[ad.position] = ad
				}
			}
		}
	})

	// 返回包含每个广告位上最新广告的对象
	return latestAdsByPosition
}
console.log(getLatestAdsByPosition())
// 监视两个广告位的数据变化
watchEffect(() => {
	// 如果两个广告位都没有广告显示，则尝试重新加载广告数据
	if (!currentAdPosition1.value && !currentAdPosition2.value) {
		nextTick(() => loadAdsData()) // 使用 nextTick 避免在组件初始化时重复加载
	}
})
</script>

<style></style>
