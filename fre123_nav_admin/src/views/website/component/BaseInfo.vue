<template>
  <div class="content-one">
    <el-form
      ref="baseFormRef"
      :model="baseForm"
      style="max-width: 700px; margin: auto"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="网站名称：" prop="app_name">
        <el-input v-model="baseForm.app_name" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="域名：" prop="web_host">
        <el-input v-model="baseForm.web_host" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="Logo：" prop="logo">
        <el-input v-model="baseForm.logo" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item label="Icon：" prop="icon">
        <el-input v-model="baseForm.icon" @change="showSaveNotice()" />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="saveBaseForm"> 保存修改 </el-button>
        <el-button @click="resetBase">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { IBaseForm, IRequestBody } from '@/api/modules/website/interface'
import { WebsiteStore } from '@/store/modules/website'
import { successMessage } from '@/utils/notifications'
import { showSaveNotice, updateWebsite } from '@/views/website/index'
import { onMounted, ref, Ref } from 'vue'
import { TabType } from '../interface'

const baseForm = ref<IBaseForm>({
  app_name: '',
  web_host: '',
  logo: '',
  icon: '',
})
const baseFormRef: Ref<any> = ref(null)

const fetchData = async () => {
  baseForm.value = await WebsiteStore().getWebsiteConfig<IBaseForm>(
    TabType.Base
  )
}

const saveBaseForm = async () => {
  const requestBody = ref<IRequestBody>({
    type: TabType.Base,
    data: baseForm.value,
  })
  await updateWebsite(requestBody.value)
  successMessage('数据成功保存')
}

const refresh = async () => {
  await fetchData()
  successMessage('刷新成功')
}
defineExpose({ refresh })

const resetBase = async () => {
  await fetchData()
}

onMounted(async () => {
  await fetchData()
})
</script>
