<template>
	<div
		ref="navBarRef"
		class="fixed rounded-lg bg-white top-[130px] py-4 px-2 w-[160px] xl:w-[220px] xl:left-[calc((100vw-1200px)/2-220px-40px)]"
	>
		<ul class="flex flex-col">
			<li
				v-for="(item, i) in navList"
				:class="`${i == currGroup ? 'bg-blue-100' : ''}`"
				class="text-[16px] py-[8px] px-2 rounded-md cursor-pointer hover:bg-blue-200"
				@click="scrollToPos(i, `nav_group_${i}`)"
			>
				{{ item.group_name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { IGroup } from '~/interface/nav'

/* __placeholder__ */
defineProps<{
	navList: IGroup[]
	currGroup: number
}>()

const emit = defineEmits(['update:currGroup'])

const scrollToPos = (idx: number, selector: string) => {
	const element = document.getElementById(selector)
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
		emit('update:currGroup', idx)
	}
}
</script>

<style scoped></style>
