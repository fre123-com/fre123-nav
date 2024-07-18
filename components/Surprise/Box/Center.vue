<template>
	<div class="overlay" v-if="isAdVisible">
		<transition name="ad-transition" appear>
			<div class="ad-box ad-box-center">
				<div class="close-button-wrapper">
					<!-- <button class="close-button" v-if="adData.allowed_close" @click="closeAd"> -->
					<button
						class="close-button"
						v-if="adData.allowed_close"
						@click="closeAd(adDataRef.value)"
					>
						<span aria-hidden="true">&times;</span>
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
import { positionMap, close24h } from '../../../interface/surprise'

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
		if (!ad || ad.is_show !== 1 || !isAdVisible.value) return false
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

// 关闭广告框，并设置24小时不显示
const closeAd = () => {
	// 如果广告不存在，则不关闭广告
	if (!adDataRef.value) return
	close24h(adDataRef.value)
	isAdVisible.value = false
}

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

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.25);
	z-index: 999; /* 确保蒙层在广告下方，但高于页面其它内容 */
	display: flex;
	justify-content: center;
	align-items: center;
}

/* 居中弹窗广告样式 */
.ad-box-center {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 90%; /* 限制最大宽度，避免在小屏幕上显示不全 */
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
