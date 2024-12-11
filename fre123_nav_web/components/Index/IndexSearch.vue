<template>
  <div class="w-full flex items-center justify-center flex-col">
    <ul
      v-if="resourceList.length"
      class="flex py-2 pl-[4rem] w-full text-sm relative"
      id="resource-menu"
    >
      <li id="search_tab_anchor" class="anchor text-[14px] h-full"></li>
      <li
        :id="`search_tab_${i}`"
        class="flex px-2 div-center hover:text-[#007bff] truncate"
        :class="`${currTab == i ? 'text-[#007bff]' : ''}`"
        v-for="(item, i) in resourceList"
        :key="i"
        @mouseover="slideTo(i)"
        @mouseleave="slideBack()"
        @click="switchResource(i, item.name)"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          alt=""
          class="w-[12px] h-[12px]"
        />
        <div class="ml-1 hidden lg:block">{{ item.name }}</div>
      </li>
    </ul>

    <div
      class="w-full flex mt-1 rounded-md pr-2 bg-slate-100 items-center cursor-pointer"
    >
      <div
        class="flex items-center min-w-[4rem] cursor-pointer relative hover:bg-[rgba(226,232,240,0.3)] rounded-t-md"
        @mouseover="showResourceList = true"
        @mouseleave="showResourceList = false"
      >
        <span class="text-center py-2 w-full">
          {{ currResourceType?.name }}
        </span>
        <ul
          class="absolute top-[40px] left-0 min-w-[4rem] truncate transition-all duration-500 flex-col shadow-lg rounded-b-md z-[1000] bg-gray-50"
          :class="`${
            showResourceList
              ? 'opacity-100 h-auto  rounded-b-none'
              : 'opacity-0 h-0'
          }`"
        >
          <li
            v-for="(resourceType, i) in resourceTypeList"
            class="py-2 w-full text-center cursor-pointer transition-all duration-300 hover:bg-[rgba(226,232,240)]"
            @click="switchResourceType(resourceType.key)"
          >
            {{ resourceType.name }}
          </li>
        </ul>
      </div>
      <div class="h-full relative flex-grow">
        <input
          class="w-full lg:min-w-[600px] bg-slate-100 h-6 px-2 py-1 border-l-[2px] border-l-slate-200 focus:outline-none"
          type="text"
          v-model="keyword"
          :placeholder="generatePlaceholder()"
          @keypress.enter="handleSearch()"
        />
      </div>
      <div class="justify-end">
        <Icon
          name="uil:search"
          size="24"
          class="items-center cursor-pointer hover:scale-105"
          @click="handleSearch()"
        ></Icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IResource, IResourceType } from '~/interface/resource'
import useResourceStore from '~/stores/resource'

definePageMeta({
  layout: false,
})

const route = useRoute()
const keyword = ref(route.query.q as string)

// 获取资源类型列表
const searchStore = useResourceStore()
await searchStore.getResourceConfig()
const resourceTypeList = searchStore.getResourceTypeList()

const showResourceList = ref(false)
const selectedResourceType = ref(searchStore.selectedResourceType)

const selectedResource = ref<IResource>()
const currResourceType = ref<IResourceType>()
const getResourceType = async (type: string) => {
  currResourceType.value = resourceTypeList.find((element) => {
    return element.key == type
  })
  if (!currResourceType.value) {
    currResourceType.value =
      resourceTypeList?.length > 0 ? resourceTypeList[0] : ''
    selectedResourceType.value = currResourceType.value?.key as string
    searchStore.setSelectedResource(selectedResourceType.value)
  }
}
await getResourceType(selectedResourceType.value)

const currTab = ref(0)

const resourceList = ref<IResource[]>([])
// 获取资源列表
const getResourceList = async (resourceType: string) => {
  const list = await searchStore.getResourceList(resourceType, false, false)
  resourceList.value = list ?? []

  const matchResource = resourceList.value?.findLast((element, i) => {
    if (element.name == searchStore.selectedResource) {
      currTab.value = i
      return element
    }
    return
  })
  console.log('resourceType is ', resourceType)
  console.log('list is ', list)
  console.log('selectedResourceType.value', selectedResourceType.value)
  selectedResource.value = matchResource
    ? matchResource
    : list?.length > 0
    ? list[0]
    : ''
}
await getResourceList(selectedResourceType.value)

// 搜索事件
const handleSearch = () => {
  const url = `${selectedResource.value?.url}`.replaceAll(
    '{keyword}',
    keyword.value
  )
  navigateTo(url, {
    open: {
      target: '_blank',
    },
  })
}

const generatePlaceholder = () => {
  return selectedResource.value?.name == '全部'
    ? '请输入您要搜索的内容...'
    : `在 ${selectedResource.value?.name} 中搜索`
}

const switchResource = (idx: number, name: string) => {
  selectedResource.value = resourceList.value?.findLast((element) => {
    return element.name == name
  })
  currTab.value = idx
  searchStore.setSelectedResource(name)
  slideTo(idx)
}

// 初始化移动条位置
const slideTo = (idx: number) => {
  const dom = document.getElementById(`search_tab_${idx}`)
  if (dom) {
    const w = dom.offsetWidth as number
    const offsetLeft = dom.offsetLeft

    console.log('w is', w, 'offsetLeft is ', offsetLeft)
    const anchor = document.getElementById('search_tab_anchor')
    if (anchor != null) {
      anchor.style.width = 20 + 'px'
      anchor.style.transitionDuration = '0.3s'
      anchor.style.transform = `translateX(${(w - 20) / 2 + offsetLeft - 64}px)`
    }
  }
}

const slideBack = () => {
  slideTo(currTab.value)
}

// 切换资源类型
const switchResourceType = async (val: string) => {
  selectedResourceType.value = val
  await getResourceType(val)
  await getResourceList(val)
  selectedResource.value =
    resourceList.value?.length > 0 ? resourceList.value[0] : ''
  showResourceList.value = false
  setTimeout(() => {
    slideTo(0)
  }, 200)
  currTab.value = 0
  searchStore.setSelectedResourceType(val)
}

onMounted(() => {
  slideTo(currTab.value)
})
</script>

<style scoped>
.search-area {
  @apply w-full sticky top-0;
}
.search-result-area {
  @apply mt-[10px] w-full flex flex-row;
}

.div-center {
  @apply justify-center items-center;
}

.active {
  @apply text-[#007bff] font-bold;
}

.anchor {
  @apply absolute h-0 bottom-0 opacity-100 z-0 border-b-[1.5px] border-b-[#272828];
}
</style>
