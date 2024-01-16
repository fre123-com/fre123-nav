// 判断是否在元素外部点击
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

// 把绑定的元素传进来
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
	const isClickOutside = ref(false)

	const handler = (e: MouseEvent) => {
		// console.log('elementRef', elementRef)
		// console.log('e.target', e.target)

		if (elementRef.value) {
			//  判断点击的地方是否在元素以外
			const a = e.target as HTMLElement
			if (elementRef.value.contains(e.target as HTMLElement)) {
				isClickOutside.value = false
			} else {
				isClickOutside.value = true
			}
		}
	}
	onMounted(() => {
		document.addEventListener('click', handler)
	})
	onUnmounted(() => {
		document.removeEventListener('click', handler)
	})
	return isClickOutside
}

export default useClickOutside
