<template>
  <el-popconfirm
    :title="title"
    :width="`${width}px`"
    confirm-button-text="确定"
    :cancel-button-text="cancelButtonText"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #reference>
      <el-button :color="iconColor" :disabled="isDisable" circle>
        <template #icon>
          <el-icon color="#fff">
            <slot name="icon">
              <delete />
            </slot>
          </el-icon>
        </template>
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { META_DANGER } from '@/config/const'

withDefaults(
  defineProps<{
    width?: number
    title?: string
    icon?: string
    iconColor?: string
    isDisable?: boolean
    cancelButtonText?: string
  }>(),
  {
    width: 200,
    title: '是否确认删除？',
    icon: 'delete',
    iconColor: META_DANGER,
    isDisable: false,
    cancelButtonText: '取消',
  },
)

const emit = defineEmits(['handle:confirm', 'handle:cancel'])
const handleConfirm = (event: any) => {
  emit('handle:confirm', event)
}

const handleCancel = (event: any) => {
  emit('handle:cancel', event)
}
</script>

<style scoped></style>
