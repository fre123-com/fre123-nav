<template>
  <ClientOnly v-if="surpriseList">
    <!-- 右下角展示 -->
    <div
      class="website-surprise"
      v-for="(surprise, index) in surpriseList.filter(
        (element) => element.position == SurprisePositionEnum.BOTTOM_RIGHT
      )"
      :key="index"
    >
      <SurpriseText
        v-if="surprise.type == SurpriseTypeEnum.TEXT"
        :surprise="surprise"
        @surprise:close="hideSurprise"
      ></SurpriseText>
      <SurpriseImage
        :surprise="surprise"
        @surprise:close="hideSurprise"
        v-else-if="surprise.type == SurpriseTypeEnum.PIC"
      ></SurpriseImage>

      <!-- TODO 图片 + 文字 广告 -->
      <!-- <SurpriseImageAndText></SurpriseImageAndText> -->
    </div>
    <!-- TODO 全局弹窗广告 -->
  </ClientOnly>
</template>

<script setup lang="ts">
import type { IStorageSurpriseItem, ISurpriseItem } from '~/interface/surprise'
import { SurprisePositionEnum, SurpriseTypeEnum } from '~/interface/surprise'
import {
  CONFIG_BUSINESS_KEY_SURPRISE,
  getBusinessConfig,
} from '~/stores/config'
import useSurpriseStore from '~/stores/surprise'

const curPath = '/' + useRoute().path.split('/')[1] ?? ''
const surpriseList = ref<ISurpriseItem[]>([])

const surpriseStore = useSurpriseStore()
const hiddenList = surpriseStore.hiddenSurpriseList ?? []
const curTime = Math.round(Date.now() / 1000)

console.log('now time is ', curTime)
const hideSurprise = (s: ISurpriseItem) => {
  const surItem: IStorageSurpriseItem = {
    title: s.title,
    hidden_time: curTime,
  }
  hiddenList.push(surItem)
  surpriseStore.setHiddenSurprise(hiddenList)
  surpriseList.value = surpriseList.value.filter(
    (surprise) => surprise.title != s.title
  )
}

// 处理隐藏的广告
const dealStorageSurprise = (): string[] => {
  if (hiddenList?.length == 0) {
    return [] as string[]
  }

  const hiddenTitles: string[] = []
  ;(hiddenList ?? []).forEach((surItem) => {
    // 隐藏超过24小时，重新打开
    if (surItem.hidden_time + 24 * 60 * 60 < curTime) {
      hiddenList.splice(hiddenList.indexOf(surItem), 1)
    } else {
      hiddenTitles.push(surItem.title)
    }
  })
  return hiddenTitles
}

// 获取广告列表

const getSurpriseList = async () => {
  const configData = await getBusinessConfig(CONFIG_BUSINESS_KEY_SURPRISE)

  // console.log(`当前页面路径：${curPath},广告数据为：`, configData)

  const curTime = Math.round(Date.now() / 1000)
  // @ts-ignore

  ;(configData ?? []).forEach((formatItem: ISurpriseItem) => {
    // 兼容旧的数据结构
    if (formatItem.allowed_close === undefined) {
      formatItem.allowed_close = 1
    }
    if (formatItem.is_show === undefined) {
      formatItem.is_show = 1
    }

    // 判断广告是否在有效期内
    if (
      formatItem.end_ts < curTime ||
      formatItem.start_ts > curTime ||
      !formatItem.is_show
    ) {
      return
    }

    // 获取隐藏广告列表
    const hiddenSurprises = dealStorageSurprise()
    if (hiddenSurprises.includes(formatItem.title)) {
      return
    }

    surpriseList.value.push(formatItem)
  })

  surpriseList.value = surpriseList.value?.slice(0, 1)
}
await getSurpriseList()
</script>

<style scoped lang="scss">
.website-surprise {
  @apply fixed md:bottom-[60px] md:right-[20px] bottom-2 right-2 z-[1000] rounded-xl;
  background: linear-gradient(
    110.17deg,
    #ffe3d4 -3.58%,
    #fffbd7 58.23%,
    #fbf2ff 103.91%
  );
}
</style>
