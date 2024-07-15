<template>
	<div class="advertising-body">
		<div class="overlay" v-if="isAdVisible && position == '居中弹窗'">
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
		<!-- 根据 position 判断广告的显示位置 -->
		<!-- 居中弹窗 -->

		<!-- 右下角广告 -->
		<div v-else-if="isAdVisible && position == '右下角'">
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
	</div>
</template>

<script setup lang="ts">
import type { ISurpriseItem } from '../../interface/surprise'
import { positionMap } from '../../interface/surprise'

// 使用 defineProps 定义子组件的 props，并接收父组件传递的数据
const props = defineProps<{
	adData: ISurpriseItem | null // 允许 adData 为 null，如果它可能不存在
}>()

// 使用 ref 来创建响应式的广告数据变量，并从 props 中获取数据
const adDataRef = ref<ISurpriseItem | null>(props.adData)

// 使用 watchEffect 来响应 adData 的变化
watchEffect(() => {
	if (adDataRef.value) {
		// 确保 adDataRef.value 不是 null
		console.log('adData has changed:', adDataRef.value)
	}
})

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
// 计算属性，根据 positionMap 获取当前广告位置的描述
const position = computed(() =>
	adDataRef.value?.position ? positionMap[adDataRef.value.position] : '',
)

// 使用 watchEffect 来响应 shouldDisplayAd 的变化
watchEffect(() => {
	isAdVisible.value = shouldDisplayAd.value
})

// 关闭广告框，并设置24小时不显示
const closeAd = () => {
	if (!adDataRef.value) return
	const ad = adDataRef.value
	const closeTime = new Date()
	closeTime.setHours(closeTime.getHours() + 24) // 设置24小时后的时间
	// closeTime.setMinutes(closeTime.getMinutes() + 3)
	localStorage.setItem(`${ad.ads_id}_closeTime`, closeTime.toISOString())
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
/* 添加蒙层样式 */
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

.advertising-body {
	position: relative;
}

/* 公共广告框样式 */
.ad-box {
	font-size: 20px;
	position: fixed;
	padding: 10px;
	width: 300px; /* 宽度固定 */
	height: auto;
	background-color: #fff8e1;
	border-radius: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	text-align: center;
	overflow: hidden; /* 确保内容不会超出边界 */
	z-index: 1000;
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

/* 右下角广告样式 */
.ad-box-bottom-right {
	bottom: 20px;
	right: 20px;
	max-width: calc(100% - 40px); /* 减去padding和border宽度 */
}

.ad-image {
	max-width: 100%;
	height: auto;
	border-radius: 5px;
	margin-bottom: 10px; /* 与文本保持一定间距 */
	/* overflow: hidden; */
	/* width: 100%; 图片宽度自适应 */
	/* height: 100%; 高度自动 */
	border-radius: 5px; /* 轻微圆角 */
}

.ad-content {
	max-width: 100%; /* 确保图片和内容在广告框内 */
	display: inline-block; /* 使内容在行内显示 */
	flex-grow: 1;
	margin-top: 10px;
	margin-bottom: 10px;
}
.ad-content h1 {
	color: #ff4757;
	font-weight: bolder;
	margin-bottom: 10px;
}
.ad-link {
	color: rgb(148, 49, 49);
	text-decoration: none;
	display: block; /* 使链接独占整行 */
}

.ad-link:hover {
	color: rgb(210, 62, 74);
}

.ad-text {
	color: rgb(148, 49, 49);
	margin-top: 10px;
}

.close-button-wrapper {
	position: absolute; /* 使子按钮绝对定位相对于此元素 */
	top: 0px;
	right: 0px;
	width: 25px;
	height: 25px;
}

/* 关闭按钮的基本样式 */
.close-button {
	font-size: 25px;
	color: #ff4757;
	border: 1px solid #000;
	border-radius: 50%;
	width: 100%;
	height: 100%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.3s ease; /* 平滑过渡 */
}

/* 鼠标悬停时的样式 */
.close-button:hover {
	transform: rotate(360deg); /* 鼠标悬停时旋转360度 */
	transform-origin: center;
}

/* 定义 Vue transition 的 CSS 类 */
.ad-transition-enter-active,
.ad-transition-leave-active {
	transition: transform 0.5s, opacity 0.5s;
}
.ad-transition-enter-from,
.ad-transition-leave-to {
	transform: translateY(100%);
	opacity: 0;
}
</style>
