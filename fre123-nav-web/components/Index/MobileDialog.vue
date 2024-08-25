<template>
	<div
		class="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-[9999]"
		@click="handleClose"
	>
		<div
			class="w-[40%] flex flex-col mx-auto shadow-normal rounded-lg p-4 z-[10000] relative"
			@click="stop"
		>
			<a
				:href="item.url"
				target="_blank"
				v-for="item in list"
				class="mb-4 transition-bg-hover-200 bg-opacity-100 text-center"
			>
				{{ item.name }}</a
			>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	list: any[]
}>()

// 阻止冒泡
const stop = ($event) => {
	$event.stopPropagation()
}

const emits = defineEmits(['dialog:close:header'])
const handleClose = () => {
	// 关闭弹窗
	emits('dialog:close:header')
}
</script>

<style scoped></style>
