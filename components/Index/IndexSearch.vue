<template>
	<div
		v-if="searchConfig.is_show && searchConfig.list.length"
		id="search-group"
		class="rounded-3xl flex flex-row items-center h-[44px] border-[1px] border-gray-200 hover:border-gray-300"
	>
		<div id="search-engine" class="relative">
			<div
				ref="searchMenuRef"
				class="flex flex-row px-4 py-2 border-r-[1px] border-r-white border-solid cursor-pointer h-[46px] rounded-3xl rounded-r-none items-center justify-center"
				@click="triggerClick"
			>
				<img :src="currEngine.icon" alt="" class="items-center justify-center h-[24px] w-[24px]" />
				<span
					class="ml-2 hover:text-blue-500 min-w-[2rem] leading-[24px] h-[24px] font-bold whitespace-nowrap text-ellipsis overflow-hidden"
					>{{ currEngine.name }}</span
				>
				<div class="flex items-center justify-center ml-2">
					<IconsArrowDown> </IconsArrowDown>
				</div>
			</div>
			<ul
				v-if="searchConfig.is_show"
				id="engine-list"
				class="absolute top-[54px] transition-all duration-300 hidden rounded-lg bg-white border-[1px] border-[#F4F5F7] overflow-hidden"
			>
				<li
					class="flex flex-row px-4 py-2 border-b-[1px] cursor-pointer hover:bg-[#f3f5fb] hover:text-[#000]"
					v-for="item in searchConfig.list"
					:class="`${item.name === currEngine.name ? 'bg-[#f1f1f3]' : ''}`"
					@click="switchEngine(item)"
				>
					<img :src="item.icon" alt="" class="h-[24px] w-[24px]" />
					<span class="ml-2 whitespace-nowrap text-ellipsis overflow-hidden">{{ item.name }}</span>
				</li>
			</ul>
		</div>
		<!-- <div
			contenteditable
			class="flex w-[300px] outline-none border-none whitespace-nowrap pl-2"
			@keyup.enter="jumpToSearch()"
		> -->
		<input
			id="search-keyword"
			type="text"
			v-model="keyword"
			:placeholder="currEngine.placeholder"
			class="flex w-[300px] outline-none border-none focus:ring-0 border-0 whitespace-nowrap pl-2 bg-transparent"
			@keyup.enter="jumpToSearch()"
		/>
		<!-- </div> -->
		<div class="p-4">
			<IconsSearch @click="jumpToSearch()"></IconsSearch>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CONFIG_KEY_HERDER, getConfigItem } from '~/stores/config'
import useSettingStore from '~/stores/settings'

const searchConfig = getConfigItem(CONFIG_KEY_HERDER)['search']

const settingStore = useSettingStore()
const currEngine = ref(settingStore.curEngine)

const showEngineList = ref(false)
const keyword = ref('')

// 切换搜索引擎
const switchEngine = (val: any) => {
	settingStore.switchEngine(val)
	currEngine.value = val
	triggerClick()
}

const jumpToSearch = () => {
	const targetUrl = currEngine.value.url + keyword.value
	window.open(targetUrl, '_blank')
}

const searchMenuRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(searchMenuRef)

const triggerClick = () => {
	showEngineList.value = !showEngineList.value
	isClickOutside.value = !isClickOutside

	const element = document.getElementById('engine-list')
	if (element) {
		if (element.classList.contains('hidden')) {
			element.classList.remove('hidden')
		} else {
			element.classList.add('hidden')
		}
	}
}

//通过watch来监听isClickOutside的变化
watch(isClickOutside, (newValue) => {
	if (isClickOutside.value) {
		// showEngineList.value = false
	}
	console.log('newValue', newValue)
	console.log('isClickOutside', isClickOutside)
})
</script>

<style scoped>
.time-num {
	/* border:1px solid rgb(102, 102, 102); */
	height: 100%;
}
.time-dot {
	height: 100%;
}

.search-type-arrow {
	height: 6px;
	opacity: 0.4;
	user-select: none;
}

.search-engine {
	display: flex;
	height: 40px;
	align-items: center;
	min-width: 93px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 14px;
	color: #333333;
	/* font-weight: lighter;     */
	transition: all 0.2s;
	position: relative;
}

.search-engine:hover {
	background-color: #f7f7f7;
	color: #000000;
}

.search-engine span {
	display: inline-block;
	margin-right: 4px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
