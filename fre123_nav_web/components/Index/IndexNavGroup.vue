<template>
  <div
    v-if="
      groupData?.tab_list[currTab]?.details.filter((i) => i.is_show).length > 0
    "
    :id="`${classNamePrefixGroup}${groupData?.group_name}`"
    class="index-nav-group bg-white pt-[10px] mb-[20px] px-4 rounded-lg"
  >
    <div
      class="flex flex-row pl-[5px] pt-[8px] leading-[28px] overflow-x-scroll no-scrollbar"
    >
      <h4 class="text-gray-500 text-md md:text-lg flex">
        <span
          class="text-[16px] md:text-[18px] text-[#555555] pr-2 font-semibold truncate"
          >{{ groupData?.group_name }}</span
        >
      </h4>
      <div class="h-[18px] my-[5px] w-[2px] bg-gray-200 mx-4 md:mx-8"></div>
      <div
        v-if="groupData.tab_list.length > 0"
        class="justify-center items-center text-[#888] flex-none"
      >
        <div>
          <ul class="flex relative h-[28x] leading-[28px] overflow-hidden">
            <li
              :id="`${classNamePrefixGroup}${idx}_anchor`"
              class="anchor text-[14px] h-full"
              :style="{
                width: `${initWidth}px`,
                left: `${initLeft}px`,
              }"
            ></li>
            <li
              v-for="(tab, i) in groupData.tab_list"
              :data-index="i"
              :key="i"
              :id="`${classNamePrefixGroupTab}${groupData.group_name}_${tab?.tab_name}`"
              class="index-nav-group-tab-item"
              :class="`${currTab == i ? 'active' : 'font-wei'}`"
              @mouseenter="slideTo(i, `${tab?.tab_name}`)"
              @mouseleave="slideBack(`${tab?.tab_name}`)"
              @click="switchTab(i)"
            >
              {{ tab?.tab_name }}
            </li>
          </ul>
        </div>
        <div class="flex-fill"></div>
      </div>
      <div
        class="flex-grow text-right text-red-500 text-[14px] hidden md:block text-ellipsis overflow-x-hidden whitespace-nowrap"
      >
        <a
          class="hover:text-red-700"
          :href="groupData.tab_list[currTab].upper_right_corner?.url"
          target="_blank"
          >{{ groupData.tab_list[currTab].upper_right_corner?.title }}</a
        >
      </div>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 mt-[24px] cursor-pointer"
    >
      <StyleTooltip
        v-for="(item, t) in groupData.tab_list[currTab].details?.filter(
          (i) => i.is_show
        )"
        :key="t"
        :content="item.description"
        :nowrap="true"
        :element-id="`desc-${idx}-${t}`"
        class="mb-[10px]"
        :class="` ${showNumber <= t ? 'hidden' : ''}`"
      >
        <a
          v-show="item.is_show"
          class="index-nav-group-content-item rounded-xl shadow shadow-warm-gray-500 items-center py-[8px] px-[8px] border-[1px] border-white"
          :href="item.url"
          target="_blank"
          rel="nofollow"
          @mouseover="showToSourceIcon('show', idx, t)"
          @mouseout="showToSourceIcon('hide', idx, t)"
        >
          <img class="index-nav-group-content-item-icon" :src="item.icon" />
          <div class="index-nav-group-content-item-main">
            <div class="index-nav-group-content-item-name">
              {{ item.title }}
            </div>
            <div
              :id="`desc-${idx}-${t}`"
              class="index-nav-group-content-item-desc"
            >
              {{ item.description }}
            </div>
          </div>
          <div
            v-if="item.ori_url"
            :id="`to-source-icon-${idx}-${t}`"
            class="hidden h-full items-center"
            @click.stop="stop"
            @click="jumpOut(item.ori_url)"
          >
            <Icon
              size="18"
              class="flex items-center text-slate-400 hover:text-slate-500"
              name="uil:arrow-circle-right"
            ></Icon>
          </div>
        </a>
      </StyleTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGroup } from '~/interface/nav'
const props = defineProps<{
  groupData: IGroup
  idx: number
}>()

const classNamePrefixGroup = 'nav_group_'
const classNamePrefixGroupTab = 'nav_group_tab_'

const currTab = ref(0)
const isHovering = ref(false)
const tabName = ref(props.groupData.tab_list[0]?.tab_name ?? '')
const showNumber = ref(100)

const tabWidths: any = ref([])
// 切换数据
let rewrite = false
const switchTab = (val: number) => {
  currTab.value = val
  if (rewrite) {
    history.pushState(null, '', ' ')
  }
}

const padding = 12 // 左侧padding

const fontSize = 14 //字体大小
const scale = 0.6

const initWidth = ref(0)
const initLeft = ref(0)

// 初始化移动条位置
const getTranslateX = () => {
  let left = 0
  for (let i = 0; i < currTab.value; i++) {
    left += tabWidths[i]
  }
  initWidth.value = tabWidths.value[currTab.value] * scale
  left += (tabWidths.value[currTab.value] * (1 - scale)) / 2
  console.log('left', left, initWidth.value)

  initLeft.value = left
}

// 移动条移动
const slideTo = (tabIndex: number, name: string) => {
  isHovering.value = true
  let left = 0
  initLeft.value = 0
  for (let i = 0; i < tabIndex; i++) {
    left += tabWidths.value[i]
  }
  initWidth.value = tabWidths.value[tabIndex] * scale
  left += (tabWidths.value[tabIndex] * (1 - scale)) / 2

  const anchor = document.getElementById(
    `${classNamePrefixGroup}${props.idx}_anchor`
  )
  if (anchor != null) {
    anchor.style.transitionDuration = '0.3s'
    anchor.style.transform = `translateX(${left}px)`
  }
}

// 返回原位置
const slideBack = (name: string) => {
  slideTo(currTab.value, name)
  isHovering.value = false
}

// 展示源网站跳转按钮
const showToSourceIcon = (type: string, idx: number, t: number) => {
  const element = document.getElementById(`to-source-icon-${idx}-${t}`)
  if (type == 'show') {
    element?.classList.remove('hidden')
    element?.classList.add('flex')
  } else {
    element?.classList.remove('flex')
    element?.classList.add('hidden')
  }
}

const jumpOut = (url: string) => {
  window.open(url, '_blank')
}

const stop = ($event) => {
  $event.stopPropagation()
  $event.preventDefault()
}

//自动定位
const located = () => {
  const route = useRoute()
  const hash = route.hash
  const routeGroupName = hash.replace('#', '').split('_')[0] ?? ''
  const routeTabName = hash.replace('#', '').split('_')[1] ?? ''

  if (routeTabName) {
    // 定位到分组
    const groupElement = document.getElementById(
      classNamePrefixGroup + routeGroupName
    )
    if (groupElement) {
      console.log('clientHeight', groupElement.offsetHeight)
      window.scrollTo({
        behavior: 'smooth',
        top: groupElement.offsetTop - 128,
      })
    }

    // 定位到子分类
    const tabElement = document.getElementById(
      classNamePrefixGroupTab + routeGroupName + '_' + routeTabName
    )
    if (tabElement) {
      tabElement.click()
      getTranslateX()
    }
  }
}

const getAllWidth = () => {
  const wrapper = document.getElementById(
    `${classNamePrefixGroup}${props.groupData?.group_name}`
  )

  if (wrapper) {
    const list = wrapper.querySelectorAll('.index-nav-group-tab-item')
    if (list) {
      Array.from(list).forEach((item: any) => {
        tabWidths.value.push(item.getBoundingClientRect().width)
      })
    }
  }
}

onMounted(async () => {
  getAllWidth()
  getTranslateX()
  await located()
  rewrite = true
})
</script>

<style scoped>
.anchor {
  position: absolute;
  height: 28px;
  /* width: 20px; */
  bottom: 0;
  opacity: 1;
  z-index: 0;
  border-bottom: 1.5px solid #007bff;
}

.active {
  color: #007bff;
  font-weight: bold;
}

.index-nav-group {
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.07);
  transition: 0.3s;
}
.index-nav-group:hover {
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.07);
}

.index-nav-group-content {
  display: flex;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
}

.index-nav-group-header {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  align-items: center;
  height: 100%;
  margin: 50px auto 20px auto;
  padding: 40px 0 0 0;
}

.index-nav-group-header-icon {
  height: 20px;
  margin-left: 10px;
}

.index-nav-group-content-item {
  display: flex;
  box-sizing: border-box;
  color: #434343;
  text-decoration: none;
  transition-property: transform, background-color;
  transition-duration: 1s, 1s;
  flex-shrink: 0;
  position: relative;
  transition: all 0.5s ease;
}

.index-nav-group-header-name {
  margin-left: 10px;
}

.index-nav-group-content-item:hover {
  z-index: 2;
  border-color: #efbb91;
  .index-nav-group-content-item-name {
    color: #007bff;
  }
  .to-source {
    display: flex;
  }
}
.index-nav-group-content-item:hover > img {
  transform: scale(1.07);
}

.index-nav-group-content-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border-radius: 50%;
  transition: all 0.6s;
}

.index-nav-group-content-item-main {
  margin-left: 10px;
  flex: 1;
  /* background-color: #40a6ff0f; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index-nav-group-content-item-name {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  flex-shrink: 0;
  min-width: 70px;
  /* background-color: rgba(170, 67, 67, 0.1); */
}
.index-nav-group-content-item-desc {
  font-size: 12px;
  height: 16px;
  color: #7f7e7e;
  /* background-color: #f951ff24; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.index-nav-group-content-item-desc:hover {
  display: block;
  white-space: normal;
  overflow: visible;
  -webkit-line-clamp: initial;
}

.index-nav-group-tab-item {
  @apply z-10 hover:text-[#007bff] hover:cursor-pointer active:text-[#007bff] active:font-bold px-3 text-[14px];
}
</style>
