<template>
	<!-- 右下角广告 -->
	<div v-if="isAdVisible">
		<transition name="ad-transition" appear>
			<div class="ad-box ad-box-bottom-right">
				<div class="close-button-wrapper">
					<button
						class="close-button"
						v-if="adData.allowed_close"
						@click="closeAd(adDataRef.value)"
					>
						<span>&times;</span>
					</button>
				</div>
				<div class="ad-content">
					<a :href="adData.url" class="ad-link" target="_blank">
						<h1>{{ adData.title }}</h1>
						<img v-if="adData.img_url" :src="adData.img_url" alt="广告图片" class="ad-image" />
						<p v-if="adData.description">{{ adData.description }}</p>
					</a>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import type { ISurpriseItem } from '../../../interface/surprise'
import { positionMap,close24h } from '../../../interface/surprise'

// 使用 defineProps 定义子组件的 props，并接收父组件传递的数据
const props = defineProps<{
	adData: ISurpriseItem | null // 允许 adData 为 null，如果它可能不存在
}>()

// 使用 ref 来创建响应式的广告数据变量，并从 props 中获取数据
const adDataRef = ref<ISurpriseItem | null>(props.adData)

const isAdVisible = ref(true)
// 检查广告是否应该显示
const shouldDisplayAd = ref(
	computed(() => {
		const ad = adDataRef.value
		const now = new Date().getTime()
		// 如果广告不存在，或者广告已关闭，或者广告已显示，则不显示广告
		if (!ad || ad.is_show !== 1 || !isAdVisible.value) return false
		// 如果广告已过期，则不显示广告
		const closeTimeStr = localStorage.getItem(`${ad.ads_id}_closeTime`)
		if (closeTimeStr) {
			const closeTime = new Date(closeTimeStr)
			return now >= closeTime.getTime()
		}
		return true
	}),
)

// 使用 watchEffect 来响应 shouldDisplayAd 的变化
watchEffect(() => {
	isAdVisible.value = shouldDisplayAd.value
})


// 监视 adData 的变化
watch(
	() => props.adData,
	(newVal) => {
		if (newVal) {
			adDataRef.value = newVal
		}
	},
)
</script>

<style scoped>
@import url('../../../assets/surpriseCommon.css');

/* 右下角广告样式 */
.ad-box-bottom-right {
	bottom: 20px;
	right: 20px;
	max-width: calc(100% - 40px); /* 减去padding和border宽度 */
}
</style>
