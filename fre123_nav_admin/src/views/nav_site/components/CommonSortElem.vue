<template>
   <div @click="handleClick" class="flex items-center gap-2 h-fit text-white cursor-pointer">
      <ElTooltip v-if="isLock" effect="light" content="点击即可解锁拖拽功能">
        <ElIcon :size="16" class=" rounded-full p-1" :style="`background: ${META_PRIMARY}`">
          <Lock />
        </ElIcon>
      </ElTooltip>
      <ElTooltip v-else effect="light" content="锁定并撤销拖拽行为">
        <ElIcon @click="onReset" :size="10" class="rounded-full p-1.5" style="color: black; border: 1px solid #f3f4f6;">
          <Unlock  />
        </ElIcon>
      </ElTooltip>
      <ElTooltip effect="light" content="保存数据" v-if="!isLock">
        <ElIcon :size="12" class="rounded-full p-1.5" :style="`background: ${META_PRIMARY}`" @click="onSave">
          <Select />
        </ElIcon>
        
      </ElTooltip>
    </div>
  </template>
  <script setup lang="ts">
  import {Lock} from '@element-plus/icons-vue';
  import { META_DANGER, META_INDIVIDUATION, META_PRIMARY, META_SUCCESS } from '@/config/const'
  import { ref } from 'vue';
  

  type LockProps = {
    modelValue?: boolean
    isLock?:boolean
  }
  
  const lockProps = withDefaults(defineProps<LockProps>(), {
    modelValue: false,
    isLock:false
  })
  
  type LockEmits = {
    (e: 'update:modelValue', value:boolean):void,
    (e: 'reset'):void,
    (e: 'success'):void
  }
  const lockEmits = defineEmits<LockEmits>()
  
  const onReset = (e:Event) => {
   e.stopPropagation()
   //  isLock.value = true
    lockEmits('reset');
  };
  
  const onSave = (e:Event) => {
    e.stopPropagation()
   //  isLock.value = true
   lockEmits('success');
   
  };
  
  const handleClick = () => {
//   isLock.value = false
  }
  </script>