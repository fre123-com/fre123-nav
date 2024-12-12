import { AuthStore } from '@/store/modules/auth'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
  // 当前页面关键字
  const nowKey = ref<string>('')
  // 当前页面路由对象
  const route = useRoute()

  nowKey.value = route.meta.key as string

  // 当前页按钮权限列表
  const BUTTONS = computed(() => {
    const authStore = AuthStore()
    // 未获取接口数据前，设为空对象，否则报错
    return authStore.authButtonsObj[nowKey.value] || {}
  })

  return {
    nowKey,
    BUTTONS,
  }
}
