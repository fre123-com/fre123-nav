<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    width="700"
    align-center
    @update:modelValue="updateDialogVisible"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      :label-width="'110px'"
      style="margin: 10px 20px 0 20px"
      class="custom-form"
    >
      <el-form-item
        v-for="(field, index) in fields"
        :key="index"
        :prop="field.model"
        :label="field.label"
      >
        <component
          :is="field.type"
          v-model="formData[field.model]"
          v-bind="field.props"
          :placeholder="field?.placeholder ?? ''"
        ></component>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { defineProps, defineEmits, ref } from 'vue'

interface CommonDialogProps {
  dialogVisible: boolean
  title: string
  formData: any
  formRules: any
  saveHandler: (event: MouseEvent) => void
  fields: { label: string; model: string; type: string; props?: any }[]
}

const props = defineProps<CommonDialogProps>()

const emit = defineEmits(['update:dialogVisible'])

const formRef = ref()

const updateDialogVisible = (value: boolean) => {
  emit('update:dialogVisible', value)
  formRef.value?.resetFields()
}

const closeDialog = () => {
  updateDialogVisible(false)
  formRef.value?.resetFields()
}

const handleSave = (evt: MouseEvent) => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      props.saveHandler(evt)
      formRef.value?.resetFields()
    } else {
      console.log('Validation failed')
    }
  })
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
