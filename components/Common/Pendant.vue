<template>
	<div
		v-if="pendantConfig.is_show"
		id="navbar-pendant"
		class="z-50 fixed right-[10px] opacity-90 top-[60%]"
	>
		<ul>
			<li
				v-for="(item, i) in pendantConfig.list"
				class="navbar-icon-style"
				:style="{
					color: `${item.icon_color}`,
				}"
				:class="`hover:text-${item.icon_hover_class}`"
			>
				<component :is="item?.url ? 'a' : 'div'" :href="item?.url" target="_blank">
					<IconsFontAwesome
						:icon="item?.icon_class"
						:size="item.icon_size"
						@mouseenter="switchHoverIdx(i)"
						@mouseleave="switchHoverIdx(-1)"
					></IconsFontAwesome>
					<div
						v-if="item?.img"
						:class="`${hoverIdx === i ? 'block' : 'hidden'}`"
						class="absolute top-0 right-[50px] p-[10px] bg-white"
					>
						<img :src="item?.img" class="h-[110px] max-w-fit" alt="" />
						<p class="text-[chocolate] text-[12px] whitespace-nowrap m-0">{{ item?.text }}</p>
					</div>
					<p
						v-else-if="!item?.img && item?.text"
						:class="`${hoverIdx === i ? 'block' : 'hidden'}`"
						class="hover-p w-auto"
					>
						{{ item.text }}
					</p>
				</component>
			</li>
			<transition name="to-top" mode="out-in" class="">
				<li
					v-show="showToTopIcon"
					id="toTopIcon"
					class="navbar-icon-style text-slate-200 hover:text-white cursor-pointer"
					@click="scrollToTop()"
				>
					<!-- <IconsToTop></IconsToTop> -->
					<IconsFontAwesome :size="20" icon="fas fa-arrow-up"></IconsFontAwesome>
				</li>
			</transition>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { CONFIG_KEY_PENDANT, getConfigItem } from '~/stores/config'

const pendantConfig = getConfigItem(CONFIG_KEY_PENDANT)

const showQrCode = ref(false)
const showToTopIcon = ref(false)

const hoverIdx = ref(-1)
const switchHoverIdx = (val: number) => {
	hoverIdx.value = val
}

const scrollToTop = () => {
	document.querySelector('body')?.scrollIntoView({ behavior: 'smooth' })
	showToTopIcon.value = true
}

const handleScroll = () => {
	const dom = document.getElementById('wrap')
	if (dom) {
		const t = dom?.getBoundingClientRect().top
		if (t < 75) {
			showToTopIcon.value = true
		} else {
			showToTopIcon.value = false
		}
	}
}

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.navbar-icon-style {
	@apply w-[35px] h-[35px] mb-[5px] leading-[35px] rounded-[4px] bg-[#f8f9fa] text-center shadow-[0_2px_5px_rgba(0,0,0,0.3)] relative;
}
#navbar-pendant > ul {
	border-bottom: 1px solid rgb(209, 207, 207, 0.25);
}

// .header-transition {
// 	transition: all 0.3s ease-in-out;
// }
//
.to-top-enter,
.to-top-leave-to {
	opacity: 0;
}
.to-top-enter-to,
.to-top-leave {
	opacity: 1;
}
.to-top-enter-active {
	transition: all 0.3s ease;
}
.to-top-leave-active {
	transition: all 0.3s ease;
}
// ul > li {
// 	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
// 	background-color: #f8f9fa;
// }

#toTopIcon {
	background-color: #555 !important;
}

.hover-p {
	@apply h-[35px] w-[35px] min-w-[210px] bg-[#f8f9fa] text-center text-black leading-[35px] rounded-[4px] mb-[5px]	shadow-[0_2px_5px_rgba(0,0,0,0.3)] absolute bottom-[-4px] right-[50px] py-0 px-[12px] text-[12px];
}
</style>
