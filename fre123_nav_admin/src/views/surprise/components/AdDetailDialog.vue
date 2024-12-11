<template>
  <el-dialog
    :visible.sync="showDetail"
    title="广告详情"
    width="50%"
    @close="handleClose"
  >
    <el-form label-width="120px" class="bold form-style">
      <el-form-item label="广告标题">
        <el-input v-model="currentAd.title" readonly></el-input>
      </el-form-item>

      <el-form-item label="广告类型">
        <el-input
          :value="formatSurpriseType(currentAd.type)"
          readonly
        ></el-input>
      </el-form-item>
      <div v-if="currentAd.type == 2 || currentAd.type == 3">
        <el-form-item label="文字描述" style="margin-left: 40px">
          <el-input v-model="currentAd.description" readonly></el-input>
        </el-form-item>
      </div>
      <div v-if="currentAd.type == 1 || currentAd.type == 3" class="showImg">
        <el-form-item label="图片链接" style="margin-left: 40px">
          <el-input v-model="currentAd.img_url" readonly></el-input>
        </el-form-item>
        <img
          :src="currentAd.img_url"
          alt="广告图片"
          class="adsImg"
          @click="openImageViewer(currentAd.img_url)"
        />
      </div>

      <el-form-item label="支持关闭">
        <el-switch
          v-model="currentAd.allowed_close"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          disabled
        ></el-switch>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-input :value="formatDate(currentAd.start_ts)" readonly> </el-input>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-input :value="formatDate(currentAd.end_ts)" readonly></el-input>
      </el-form-item>
      <!-- 持续时间 -->
      <el-form-item label="持续时间">
        <el-input :value="formattedDuration" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-switch
          v-model="currentAd.is_show"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          disabled
        ></el-switch>
      </el-form-item>

      <el-form-item label="投放页面">
        <el-input
          :value="formatSurpriseWebPath(currentAd.web_path)"
          readonly
        ></el-input>
      </el-form-item>

      <el-form-item label="广告位置">
        <el-input
          :value="formatSurprisePosition(currentAd.position)"
          readonly
        ></el-input>
      </el-form-item>

      <el-form-item label="页面链接">
        <el-input v-model="currentAd.url" readonly></el-input>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-input :value="formatDate(currentAd.created_at)" readonly></el-input>
      </el-form-item>

      <el-form-item label="更新时间">
        <el-input :value="formatDate(currentAd.updated_at)" readonly></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
    <teleport to="body">
      <el-image-viewer
        v-if="imageViewerActive"
        :url-list="previewSrcList"
        :index="currentImageIndex"
        @close="handleImageViewerClose"
      />
    </teleport>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import { ElDialog } from 'element-plus'
import {
  formatSurpriseType,
  formatSurpriseWebPath,
  formatSurprisePosition,
} from '@/views/surprise/index'
import { formatDate } from '@/utils/formateTime'
const props = defineProps({
  showDetail: Boolean, // 对话框是否可见
  currentAd: Object, // 当前查看的广告数据
})

const emit = defineEmits(['update:show-detail'])

const showDetail = ref(props.showDetail) // 使用 ref 保持 showDetail 的响应性

watch(
  () => props.showDetail,
  (newValue) => {
    showDetail.value = newValue // 保持响应性
  }
)

const handleClose = () => {
  showDetail.value = false // 关闭对话框
  emit('update:show-detail', false) // 更新父组件状态
}

const formattedDuration = computed(() => {
  // 检查 currentAd 是否存在以及 start_ts 和 end_ts 是否有效
  if (
    !props.currentAd ||
    isNaN(props.currentAd.start_ts) ||
    isNaN(props.currentAd.end_ts)
  ) {
    return 'N/A' // 如果数据无效，显示 N/A
  }

  // 计算时间差，转换为小时和分钟和秒
  const diffInSeconds = Math.abs(
    props.currentAd.end_ts - props.currentAd.start_ts
  )
  const hours = Math.floor(diffInSeconds / 3600)
  const minutes = Math.floor((diffInSeconds % 3600) / 60)
  const second = Math.floor((diffInSeconds % 3600) % 60)
  return `${hours}小时 ${minutes}分钟 ${second}秒`
})

// 图片查看器逻辑（如果需要）
const imageViewerActive = ref(false)
const previewSrcList = ref<string[]>([])
const currentImageIndex = ref(0)

const openImageViewer = (url: string) => {
  imageViewerActive.value = true
  previewSrcList.value = [url]
  currentImageIndex.value = 0
}

// 关闭图片预览
const handleImageViewerClose = () => {
  imageViewerActive.value = false
  previewSrcList.value = []
  currentImageIndex.value = 0
}
</script>

<style scoped>
.form-style {
  margin-top: 10px;
}
.bold {
  font-weight: bold;
}
.showImg {
  text-align: center; /* 水平居中图片 */
  margin-left: auto;
  margin-right: auto;
}
.adsImg {
  max-width: 100%;
  height: auto;
  margin-top: 40px;
  cursor: pointer;
}
img {
  height: auto;
  width: 400px;
  border-radius: 10px; /* 图片圆角 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

img:hover {
  transform: scale(1.05); /* 鼠标悬浮时放大图片 */
}
</style>
