<template>
<el-dialog :model-value="visible" title="预览效果" width="1200px">
  <div class="common-layout">
    <el-container>
      <el-header class="center">
        <el-link class="size">
        {{tableData[index].group_name}}
        </el-link>
        <span style="margin-left: 20px;"> | </span>
        <el-link
          v-for="(tab, index) in tableData[index].tab_list"
          :key="index"
          @click="showDetails(tab)"
          style="margin-left:20px ;"
        >
          {{ tab.tab_name }}
        </el-link>
      </el-header>
      <el-main>
        <div v-if="selectedTabDetails" class="flex-container">
          <div v-for="(detail,index) in details"   :key="detail.index"  >
            <div v-if="details[index].is_show"  class="flex-item">
             <a :href="detail.url" target="_blank" class="navbar">
               <div class="content-wrapper border-change">
                 <span>
                   <el-image class="rounded-image" style="width: 40px; height: 40px" :src="detail.icon" fit="cover"/>
                 </span>
                 <span style="margin-left: 5px;">
                   <div>
                     <el-text class="mx-1">{{ detail.title }}</el-text>                  
                   </div>
                   <div>
                     <el-text class="w-150px mb-2" size="small" truncated>{{ detail.description }}</el-text>
                   </div>
                 </span>
               </div>
             </a>              
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</el-dialog>
 </template>
  <script setup lang="ts">
  import {  defineProps } from 'vue';
 const props = withDefaults(
  defineProps<{
  visible?: boolean;
  tableData:any
  index:number
  selectedTabDetails?:any
  details?:any
  }>(),
  {
    visible: false,
  },
 )
 
 const emit = defineEmits<{
  (e: 'showDetails', value: any): void
 }>()
 
 const showDetails = (value: any) => {
  emit('showDetails', value)
 }
 
  
  </script>
  
  <style scoped>
.table-left{
  margin-left: 9.2%;
}
.form-top{
  margin-top: 20px;
}
.btn-group {
  display: flex;
  justify-content: flex-end; /* 右对齐 */
}
.close-right{
float: right;
margin-right: 30px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
}
.flex-item {
  flex: 0 0 calc(20% - 10px); /* 每行显示5列，并设置间隙 */
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  align-items: center;
  border: 1px solid #ccc; /* 边框样式 */
  border-radius: 10px;
  padding: 5px; /* 内边距，可根据需求调整 */
  box-shadow: 0px 3px 3px rgb(227, 227, 227)
}
.border-change:hover{
  border: 1px solid rgb(239, 187, 145) ; /* 边框样式 */
}
.center{
  display: flex;  
  align-items: center; /* 这将垂直居中子元素 */  
}
.size{
  font-size: large;
  font-weight: 600;
}
/* 块的调整 */
.rounded-image {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
.navbar{
  position: relative;
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  align-items: center;
  border-radius: .75rem;
  border-width: 1px;
  padding: 8px;
}
.grid-item {
  padding: 10px; /* 可选，定义每个项目的内边距 */
}
.dragIcon {
  cursor: move; /* 拖拽手柄的样式 */
}
  </style>
 