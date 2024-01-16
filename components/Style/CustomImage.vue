<template>
	<div ref="container" class="flex justify-center items-center overflow-hidden rounded-lg">
		<img
			v-if="src || !isLazy"
			:src="src"
			:alt="alt"
			:class="imageClass"
			:style="imageStyle"
			:loading="loading"
			:referrerpolicy="`${noReferrer ? 'no-referrer' : ''}`"
			@load="handleLoad"
		/>
		<!-- <div v-if="isLazy && isLoading">
			<slot name="placeholder">
				<div class="flex justify-center items-center" :class="imageClass">
					<Icon name="line-md:loading-twotone-loop" class="w-8 h-8" />
				</div>
			</slot>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { useThrottleFn, useEventListener } from '@vueuse/core'
import type { CSSProperties } from 'nuxt/dist/app/compat/capi'

const props = withDefaults(
	defineProps<{
		src: string
		alt?: string
		loading?: 'lazy' | 'eager'
		imageClass?: string
		imageStyle?: CSSProperties
		noReferrer?: boolean
	}>(),
	{
		src: '',
		alt: '',
		loading: 'eager',
		imageClass: '',
		imageStyle: (): CSSProperties => ({}),
		noReferrer: false,
	},
)

const isLoading = ref(true)
const container = ref<HTMLElement>()

let stopScrollListener: (() => void) | undefined

const isLazy = computed(() => props.loading === 'lazy')

const loadImage = () => {
	if (process.client) {
		// reset status
		isLoading.value = true
	}
}

function handleLoad() {
	isLoading.value = false
}

const isInContainer = (el?: Element): boolean => {
	if (!process.client || !el || !container) return false

	const elRect = el.getBoundingClientRect()

	const containerRect = {
		top: 0,
		right: window.innerWidth,
		bottom: window.innerHeight + (window.scrollY || window.pageYOffset),
		left: 0,
	}

	return (
		elRect.top < containerRect.bottom &&
		elRect.bottom > containerRect.top &&
		elRect.right > containerRect.left &&
		elRect.left < containerRect.right
	)
}

function handleLazyLoad() {
	if (isInContainer(container.value)) {
		loadImage()
		removeLazyLoadListener()
	}
}

const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true)

async function addLazyLoadListener() {
	if (process.client) {
		await nextTick()

		if (window) {
			stopScrollListener = useEventListener(window, 'scroll', lazyLoadHandler)
			setTimeout(() => handleLazyLoad(), 100)
		}
	}
}

function removeLazyLoadListener() {
	if (!process.client || !lazyLoadHandler) return
	stopScrollListener?.()
}

// watch(
//   () => props.src,
//   () => {
//     if (isLazy.value) {
//       // reset status
//       isLoading.value = true
//       removeLazyLoadListener()
//       addLazyLoadListener()
//     } else {
//       loadImage()
//     }
//   }
// )

onMounted(() => {
	if (isLazy.value) {
		addLazyLoadListener()
	} else {
		loadImage()
	}
})
</script>

<style scoped></style>
