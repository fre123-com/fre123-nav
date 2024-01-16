<template>
	<div ref="defaultRef" class="relative" @mouseenter="onShow" @mouseleave="onHidden">
		<slot name="trigger" />
		<transition name="select-animation">
			<div
				v-show="visible && !disabled"
				style="transition-timing-function: ease"
				class="absolute flex bottom-4 bg-white border border-gray-100 z-10 rounded-sm shadow-lg min-w-max p-1 text-[13px] popover"
				:style="{ bottom: `${defaultWidth + 14}px` }"
			>
				<slot />
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
// trigger 是一个插槽，用于触发显示 popover 的元素
// default 是一个插槽，用于显示 popover 的内容
defineProps({
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
})

const visible = ref(false)
const emits = defineEmits<{
	(e: 'show'): void
}>()
const defaultWidth = ref(0)
const defaultRef = ref()

const timer = ref<NodeJS.Timer | null>(null)

const onShow = () => {
	timer.value && clearTimeout(timer.value)
	visible.value = true
	emits('show')
}

const onHidden = () => {
	// timer.value = setTimeout(() => {
	visible.value = false
	// }, 200)
}

onMounted(() => {
	// 初始化默认宽度
	defaultWidth.value = defaultRef.value?.getBoundingClientRect().height
})
</script>

<style lang="scss" scoped>
.popover {
	left: 50%;
	color: #333;
	transform: translateX(-50%);
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100%;
		z-index: 11;
		width: 0px;
		height: 0px;
		border: 6px solid transparent;
		border-top: 7px solid #fff;
	}
}
.select-animation-enter-active,
.select-animation-leave-active {
	transition: all 1s ease;
}

.select-animation-enter-from,
.select-animation-leave-to {
	opacity: 0;
	// transform: translateY(-10px);
}
</style>
