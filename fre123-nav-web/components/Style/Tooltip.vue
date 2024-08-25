<template>
	<div class="relative" @mouseenter="showToolTip" @mouseleave="tooltipVisible = false">
		<slot></slot>
		<div
			:class="[tooltipVisible ? 'block' : 'hidden', nowrap ? 'w-full' : 'whitespace-nowrap ']"
			:style="{
				transform: `translate(-50%,${nowrap ? '100%' : '100%'})`,
			}"
			class="absolute z-20 tooltip px-2 py-[3px] text-[12px] leading-[22px] text-white bg-[#323233] bg-opacity-[85%] rounded"
		>
			{{ content }}
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	content: {
		type: String,
		default: '',
	},
	nowrap: {
		type: Boolean,
		default: false,
	},
	// JX-TODO 接收需要控制的 dom 节点 ID，这里先用 ID 来控制，后续可考虑优化
	elementId: {
		type: String,
		default: '',
	},
	forceShow: {
		type: Boolean,
		default: false,
	},
	position: {
		type: String,
		default: 'down',
	},
})
const tooltipVisible = ref(false)

const transformX = ''
const transformY = ''

// 控制 tooltip 是否展示
const showToolTip = (e: Event) => {
	if (props.forceShow) {
		tooltipVisible.value = true
	} else {
		const dom = document.getElementById(props.elementId) as HTMLElement // div 的宽度
		const containerW = dom?.clientWidth
		const wordW = dom?.scrollWidth // 先转为js对象; 文字的宽度
		if (wordW > containerW) {
			tooltipVisible.value = true
		}
		console.log('containerWidth', containerW, 'wordWidth', wordW)
	}
}
</script>

<style scoped>
.tooltip {
	left: 50%;
	/* 抵消 border 的 10px,以免影响移除后其他 item 的 hover */
	bottom: -15px;
	transform: translate(-50%, 100%);

	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%);
		width: 0px;
		height: 0px;
		border: 5px solid transparent;
		border-bottom: 5px solid rgba(50, 50, 51, 0.85);
	}
}
</style>
