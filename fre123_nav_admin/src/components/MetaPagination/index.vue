<template>
  <div class="metaso-pagination">
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.totalCount"
      :current-page="props.currentPage"
      :page-size="props.pageSize"
      :page-sizes="PAGINATION_PAGE_SIZES"
      class="mt-6 mx-auto"
      @current-change="onCurrentPage"
      @size-change="onSizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { PAGINATION_PAGE_SIZES } from '@/config/const'
import { scrollTablesTop } from '@/utils/scrollTablesTop'

const props = defineProps<{
  totalCount: number
  currentPage: number
  pageSize: number
}>()

const emit = defineEmits<{
  (e: 'currentChange', current: number): void
  (e: 'sizeChange', size: number): void
}>()

// 分页请求
const onCurrentPage = (currentPage: number) => {
  emit('currentChange', currentPage)
  scrollTablesTop()
}
const onSizeChange = (size: number) => {
  emit('sizeChange', size)
  scrollTablesTop()
}
</script>

<style scoped>
.metaso-pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
