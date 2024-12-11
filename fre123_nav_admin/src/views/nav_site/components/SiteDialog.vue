<template>
  <el-dialog :model-value="visible" @close="handleClose">
    <template #header>
      {{ dialogHeader }}
    </template>
    <el-form
      :model="props.formData"
      class="demo-form-inline"
      :rules="rules.baseRules"
      label-width="auto"
      ref="newCategoryForm"
    >
      <el-form-item label="类别名称" prop="title" class="form-top">
        <el-input v-model="formData.title" clearable />
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input v-model="formData.url" clearable />
      </el-form-item>
      <el-form-item label="图标链接" prop="icon">
        <el-input v-model="formData.icon" clearable />
      </el-form-item>
      <el-form-item label="网站描述" prop="description">
        <el-input v-model="formData.description" clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="editMode"
          type="primary"
          @click="onSubmit(newCategoryForm)"
          style="margin-left: 80%"
          >确认修改</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="onSubmitNew(newCategoryForm)"
          style="margin-left: 80%"
          >确认新建</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { rules } from '@/views/nav_site/index'
import { defineProps, ref } from 'vue'
const newCategoryForm = ref()
interface FormData {
  title: string
  url: string
  icon: string
  description: string
}

const props = withDefaults(
  defineProps<{
    visible?: boolean
    dialogHeader?: string
    formData: FormData
    editMode?: boolean
  }>(),
  {
    visible: false,
  }
)

const emit = defineEmits<{
  (e: 'onSubmit', value: any): void
  (e: 'onSubmitNew', value: any): void
}>()

const resetForm = () => {
  if (newCategoryForm.value) {
    newCategoryForm.value.resetFields()
  }
}

const handleClose = () => {
  resetForm()
}

const onSubmit = (value: any) => {
  emit('onSubmit', value)
}

const onSubmitNew = (value: any) => {
  emit('onSubmitNew', value)
}
</script>

<style scoped>
.form-top {
  margin-top: 20px;
}

.demo-form-inline .el-form-item {
  margin-left: 15px;
}

.demo-form-inline .el-input {
  --el-input-width: 520px;
}

.demo-form-inline .el-select {
  --el-select-width: 520px;
}
</style>
