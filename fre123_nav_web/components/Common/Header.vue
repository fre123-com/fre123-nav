<template>
  <div class="w-full bg-white sticky top-0 z-[110]">
    <div
      id="website-header"
      class="header-transition"
      :class="`${
        !isIndex || isMobileScreen ? 'custom-size sticky' : 'py-[15px]'
      }`"
    >
      <div class="flex md:basis-1/4 relative">
        <a :href="baseInfo?.web_host" target="_blank">
          <img
            class="header-logo header-transition"
            :src="baseInfo?.logo"
            :alt="baseInfo?.app_name"
          />
        </a>
        <a
          :href="baseInfo?.web_host"
          target="_blank"
          class="header-text header-text-initial"
        >
          {{ baseInfo?.app_name }}
        </a>
      </div>

      <div v-show="showSearch" class="header-search-container">
        <IndexSearch :showResource="true"> </IndexSearch>
      </div>

      <div class="header-right-container flex-grow pr-[20px]">
        <div
          v-for="(rightItem, i) in headerConfig?.right?.filter(
            (element) => element.is_show
          )"
          class="flex justify-end relative w-[2rem] md:w-[6rem] ml-2 h-[40px] leading-[40px]"
        >
          <div
            class="header-right-group"
            @mouseover="showCategory(true, i)"
            @mouseout="showCategory(false, i)"
          >
            <component
              :is="rightItem?.group?.url ? 'a' : 'div'"
              v-if="rightItem?.group?.name"
              :href="rightItem?.group?.url"
              target="_blank"
              class="w-[6rem] text-center bg-opacity-50 transition-bg-hover-200 cursor-pointer py-0"
              >{{ rightItem?.group?.name }}</component
            >
            <div
              :id="`config-category-${i}`"
              v-if="
                rightItem?.group?.children &&
                rightItem?.group?.children.length > 0
              "
              class="absolute transition-all text-[16px] top-[40px] bg-white rounded-md shadow-lg opacity-0 overflow-hidden"
            >
              <ul>
                <li
                  v-show="item?.is_show"
                  v-for="item in rightItem?.group?.children"
                  class="w-[6rem] text-center transition-bg-hover-200 py-0 cursor-pointer"
                >
                  <a :href="item?.url" target="_blank">{{ item?.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="md:hidden flex ml-1 justify-end items-center"
            @click="showMobileDialog(rightItem?.group?.children)"
          >
            <Icon
              v-if="rightItem?.icon"
              :name="rightItem?.icon"
              size="24"
            ></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <IndexMobileDialog
    @dialog:close:header="isShowMobileDialog = false"
    v-if="isShowMobileDialog"
    :list="configList"
  ></IndexMobileDialog>
</template>

<script setup lang="ts">
import {
  CONFIG_KEY_BASE,
  CONFIG_KEY_HERDER,
  getSiteConfigItem,
} from '~/stores/config'

withDefaults(
  defineProps<{
    isIndex: boolean
    showSearch?: boolean
    headerText?: string
  }>(),
  {
    headerText: '',
    showSearch: false,
  }
)

// 控制头部变化
const headerAnimation = (action: string) => {
  if (isMobileScreen.value) {
    return false
  }

  const headerDom = document.getElementById('website-header')
  const searchDom = document.getElementById('resource-menu')

  if (headerDom) {
    if (action == 'smaller') {
      headerDom.classList.add('custom-size')
      searchDom?.classList.add('hidden')
    } else {
      headerDom.classList.remove('custom-size')
      searchDom?.classList.remove('hidden')
    }
  }
}

const baseInfo = ref()
const headerConfig = ref()

const isShow = ref(false)
const showCategory = (show: boolean, i: number) => {
  isShow.value = show
  const dom = document.getElementById('config-category-' + i)
  if (dom) {
    if (isShow.value) {
      dom.classList.remove('opacity-0')
      dom.classList.remove('h-0')
      dom.classList.add('opacity-100')
    } else {
      dom.classList.remove('opacity-100')
      dom.classList.add('opacity-0')
      dom.classList.add('h-0')
    }
  }
}
defineExpose({ headerAnimation })

const isShowMobileDialog = ref(false)
const configList = ref()
const showMobileDialog = (list: any) => {
  console.log('list.value', list)

  configList.value = list
  isShowMobileDialog.value = true
}

const isMobileScreen = ref(false)
baseInfo.value = await getSiteConfigItem(CONFIG_KEY_BASE)
headerConfig.value = await getSiteConfigItem(CONFIG_KEY_HERDER)
onMounted(async () => {
  isMobileScreen.value = isMobile()
})
</script>

<style scoped>
#website-header {
  @apply shadow-[0_1px_2px_rgba(0,0,0,0.07)] m-auto flex border-b-2 border-b-gray-50 md:px-[20px];
}
.header-transition {
  transition: all 0.3s ease-in-out;
}

.header-logo {
  @apply w-[80px] h-[80px] ml-[20px];
}

.header-logo:hover {
  transform: rotate(360deg);
}

.header-text-initial {
  @apply header-transition ml-[10px] leading-[80px] md:text-[22px] text-[#333];
}
.header-right-container {
  @apply cursor-pointer flex md:basis-1/4 items-center justify-end flex-row;
}

.header-right-group {
  @apply hidden md:flex items-center justify-end header-transition md:text-[16px] text-[#333333];
}
/* 头部固定类 */
.custom-size {
  padding-top: 0px;
  padding-bottom: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-size img {
  width: 60px;
  height: 60px;
}

.custom-size .header-text {
  height: 60px;
  line-height: 60px;
  font-size: 22px;
}

.header-search-container {
  @apply flex-grow hidden md:flex md:basis-1/2 items-center justify-center cursor-pointer;
}
</style>
