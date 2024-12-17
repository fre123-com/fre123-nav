<template>
  <div class="font-bold text-lg">{{ userName }}</div>
  <el-dropdown trigger="hover" class="ml-1">
    <div class="avatar">
      <img :src="userInfo?.logo ? userInfo?.logo : logoNowImg" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        <el-dropdown-item @click="importData">导出数据</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <InfoDialog ref="infoRef"></InfoDialog>

  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import logoNowImg from '@/assets/images/logo-now.png'
import { GlobalStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InfoDialog from './InfoDialog.vue'
import PasswordDialog from './PasswordDialog.vue'
import importApi from '@/api/modules/import_json/index'
import { downloadDataJson } from '@/utils/exportData'

const router = useRouter()
const globalStore = GlobalStore()

const userName = globalStore.appUserName
const userInfo = globalStore.userInfo
// 退出登录
const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    router.push({ name: 'login' })
    globalStore.setToken('')
    ElMessage({
      type: 'success',
      message: '退出登录成功！',
    })
  })
}

//导出数据
const importData = async () => {
  const { data } = await importApi.getConfigData()
  downloadDataJson(data, 'data.json')
  console.log('data', data)
}

const jumpTo = (url: string) => {
  window.open(url, '_blank')
}

interface DialogExpose {
  openDialog: () => void
}
const infoRef = ref<null | DialogExpose>(null)
const passwordRef = ref<null | DialogExpose>(null)
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
  if (refName == 'infoRef') return infoRef.value?.openDialog()
  passwordRef.value?.openDialog()
}
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
