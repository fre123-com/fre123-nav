<template>
	<ul
		class="flex flex-row h-[60px] leading-[60px] text-[22px] font-bold mx-auto"
		:class="`${isFull ? ' transition-opacity' : 'w-1/2'}`"
	>
		<li
			v-for="i in 8"
			class="px-2 w-full cursor-pointer text-center hover:text-blue-300 hover:font-extrabold hover:text-[24px]"
		>
			首页
		</li>
	</ul>
</template>

<script setup lang="ts">
defineProps<{
	isFull: boolean
}>()
</script>

<style scoped></style>
