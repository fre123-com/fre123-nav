<template>
  <div>
    <MainTable
    :loading="loading"
    :table-data="tableData"
    @show-dialog="showDialog"
    @show-dialog-sed="showDialogSed"
    @new-dialog="newDialog"
    @new-dialog-sed="newDialogSed"
    @delete-row="deleteRow"
    @delete-row-sed="deleteRowSed"
    @dialog-preview="dialogPreview"
    >  
   </MainTable>
    <!-- 分割线---------下面是抽屉等等一系列东西-------------------------上面是表格的代码----------------------------------------------- -->
    <FirstDialog
      :visible="currentRow.drawerVisible"
      :form-data="formData"
      :dialog-header="tShow"
      :edit-mode="bShow"
      @on-submit="onSubmit"
      @on-submit-new="newSubmit"
      @closed="currentRow.drawerVisible = false"
    >
    </FirstDialog>
    <!-- 下面是二级的   -->
    <SecondeDialog
      :visible="currentRowSecond.drawerVisible"
      :form-data="formData"
      :dialog-header="tShow"
      :edit-mode="bShowSed"
      @on-submit="onSubmitSecond" 
      @on-submit-new="newSubmitSecond"
      @closed="currentRowSecond.drawerVisible = false"
    >
    </SecondeDialog>
    <!-- ---------------------------------------------------下面是预览区---------------------------------------------------------- -->
    <Preview
      :visible="currentPreview.drawerVisible"
      :table-data="tableData"
      :index="index"
      :selected-tab-details="selectedTabDetails"
      :details="selectedTabDetails.details"
      @show-details="showDetails"
      @closed="currentPreview.drawerVisible = false"
    >
    </Preview>
    <!-- 这是预览的弹窗 -->
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted, watch } from 'vue'
import MainTable from './components/MainTable.vue'
import FirstDialog from './components/FirstDialog.vue'
import SecondeDialog from './components/SecondeDialog.vue'
import Preview from './components/Preview.vue'
import type { FormInstance } from 'element-plus'
import {
  openWaring,
  openSuccessNew,
  openSuccessEdit,
  previewWaring,
  insertNav,
} from './index'

import { navStore } from '@/store/modules/nav'
import { deleteNav, updateNav } from './index'
import { IRequestBody, navDelate, navInsert, TabItem } from '@/api/modules/nav/interface'

const tableData = ref('') as any
//获取数据
const { refetchNav, navData } = navStore()
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))
const loading = ref(false)
//更新数据
const storedData = ref<TabItem>()
const _id = ref('')
const deleteId = ref('')
const requestBody = ref<IRequestBody>({
  _id: _id.value,
  group_name: '',
  style: '',
  style_des: '',
  tab_list: storedData.value,
  group_name_url:'',
})
const insertBody = ref<navInsert>({
  group_name: '',
  style: '',
  style_des: '',
  tab_list: storedData.value,
  group_name_url:'',
})
//删除数据
const deleteBody = ref<navDelate>({
  ids: [_id.value],
})
//整个表格的数据
const formData = ref({
  _id: '',
  group_name: '',
  style_des: '',
  group_name_url: '',
  tab_name: '',
  tab_name_url: '',
})
const index = ref('') as any
//预览的索引
const bShow = ref(true)
const bShowSed = ref(true)
const tShow = ref('修改')
//提交的按钮切换
// const editingIndex = ref<{ groupIndex: number } | null>(null);
const editingIndex = ref<{ groupIndex: number; tabIndex?: number } | null>(null)
//这是要修改的地方的索引
const currentRow = ref({ drawerVisible: false })
const currentRowSecond = ref({ drawerVisible: false })
const currentPreview = ref({ drawerVisible: false })
//这是展开的v-model
const selectedTabDetails = ref('') as any
const showDetails = (tab: any) => {
  selectedTabDetails.value = tab
}
// --------------------------------------------------上面是定义区-----------------------------------------------
watch(
  () => navData.value,
  (navData) => {
    if (navData?.data && typeof navData.data === 'object') {
      if ('rows' in navData.data && Array.isArray(navData.data.rows)) {
        loading.value = true
        tableData.value = deepClone(navData.data.rows)
        loading.value = false
      } else {
        // 如果navData.data不包含rows属性，设置一个默认值或采取其他处理方式
        tableData.value = []
        console.error('这里有bug')  
      }
    }
  },
  { immediate: true }
)
const reloadHeader = async () => {
  await refetchNav.value()
}
//更新数据
const updateHeader = async () => {
  try {
    loading.value = true

      await update('update') // 更新数据
      await updateNav(requestBody.value) // 更新导航数据
      await reloadHeader() // 重新加载头部信息
            loading.value = false

  } catch (error) {
    await reloadHeader() // 在更新失败时重新加载头部信息
  }
}
//更新数据的获取,
const update = async (type: 'update' | 'insert') => {
  if (!editingIndex.value) {
    return;
  }
  
  const { groupIndex } = editingIndex.value;
  const { group_name, style, style_des, group_name_url, tab_list } = tableData.value[groupIndex];
  const body = {
    group_name,
    style,
    style_des,
    group_name_url,
    tab_list: deepClone(tab_list),
  };

  if (type === 'update') {
    requestBody.value = {
      _id: tableData.value[groupIndex]._id, // 添加 _id
      ...body,
    };
  } else if (type === 'insert') {
    insertBody.value = body;
  }
};
const insertHeader = async () => {
  try {
    loading.value = true

      await update('insert') // 更新数据
      await insertNav(insertBody.value) // 更新导航数据
      await reloadHeader() // 重新加载头部信息
            loading.value = false

  } catch (error) {
    await reloadHeader() // 在更新失败时重新加载头部信息
  }
}
const DeleteData = async () => {
  if (!editingIndex.value) {
    return
  }
  // 更新 navId 和 requestBody
  _id.value = deleteId.value
  deleteBody.value = {
    ids: [_id.value],
  }
}

const deleteHeader = async () => {
  try {
      await DeleteData()
      await deleteNav(deleteBody.value)
      await reloadHeader()
  } catch (error) {
    reloadHeader()
  }
}
// ------------------------下面是功能性代码的代码-

const newDialog = () => {
  resetData()
  bShow.value = false
  tShow.value = '新建分类'
  currentRow.value.drawerVisible = true
}
const newDialogSed = (groupIndex: number) => {
  editingIndex.value = { groupIndex } //储存索引editingIndex.value = { groupIndex}; //储存索引
  resetData()
  bShowSed.value = false
  tShow.value = '新建分类'
  currentRowSecond.value.drawerVisible = true
}
//新建文件的展开
//第一类的展开
const showDialog = (groupIndex: number, row: any) => {
  bShow.value = true
  tShow.value = '修改分类'
  editingIndex.value = { groupIndex } //储存索引editingIndex.value = { groupIndex}; //储存索引
  currentRow.value = { ...row }
  formData.value = {
    ...formData.value,
    _id: row._id,
    group_name: row.group_name,
    style_des: row.style_des,
    group_name_url: row.group_name_url || formData.value.group_name_url // 保持现有 URL，如果 row 中没有 URL
  };
  currentRow.value.drawerVisible = true
}
//第二类的展开
const showDialogSed = (groupIndex: number, tabIndex: number, row: any) => {
  bShowSed.value = true;
  tShow.value = '修改分类';
  editingIndex.value = { groupIndex, tabIndex };
  currentRowSecond.value = { ...row };
  formData.value = {
    ...formData.value,
    tab_name: row.tab_name,
    tab_name_url: row.tab_name_url
  };
  currentRowSecond.value.drawerVisible = true;
}
const dialogPreview = (groupIndex: number,row: any) => {
  if(tableData.value[groupIndex].tab_list.length === 0){
    previewWaring()
    return  
  }
  currentPreview.value.drawerVisible =true;
  index.value=groupIndex;
  selectedTabDetails.value = row.tab_list[0];
};
//这是预览的展开
const newSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const newItem = {
        group_name: '',
        style: 1,
        style_des: '',
        tab_list: [],
      }
      Object.assign(newItem, {
        group_name: formData.value.group_name,
       style_des: formData.value.style_des,
      });
      await tableData.value.push(newItem)
      editingIndex.value = { groupIndex: tableData.value.length - 1 } // 储存索引
      openSuccessNew()
      currentRow.value.drawerVisible = false      
      await insertHeader()
    } else {
      openWaring()
    }
  })
}
//新建的提交
const newSubmitSecond = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      const { groupIndex } = editingIndex.value || {};
      if (groupIndex !== undefined) {
        const newItem = {
          tab_name: formData.value.tab_name,
          tab_name_url: formData.value.tab_name_url,
          upper_right_corner: { title: '', url: '' },
          details: [],
        };
        tableData.value[groupIndex].tab_list.push(newItem);
        currentRowSecond.value.drawerVisible = false;
        await updateHeader();
        openSuccessNew();
      }
    } else {
      openWaring();
    }
  });
};
//编辑提交的代码
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const validateForm = async () => {
    return formEl.validate();
  };
  try {
    const valid = await validateForm();
    if (valid && editingIndex.value) {
      const { groupIndex } = editingIndex.value;
      const { group_name, style_des, group_name_url } = formData.value;
      if (tableData.value) {
        tableData.value[groupIndex] = {
          ...tableData.value[groupIndex],
          group_name,
          style_des,
          group_name_url,
        };
      }
      currentRow.value.drawerVisible = false;
      await updateHeader();
      openSuccessEdit();
    } else {
      openWaring();
    }
  } catch (error) {
    openWaring();
  }
};
//
const onSubmitSecond = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    const valid = await formEl.validate();
    if (valid && editingIndex.value) {
      const { groupIndex, tabIndex } = editingIndex.value;
      if (tableData.value && groupIndex !== undefined && tabIndex !== undefined) {
        const { tab_name, tab_name_url } = formData.value;
        tableData.value[groupIndex].tab_list[tabIndex] = {
          ...tableData.value[groupIndex].tab_list[tabIndex],
          tab_name,
          tab_name_url,
        };
        currentRowSecond.value.drawerVisible = false; // 关闭弹窗
        await updateHeader();
        openSuccessEdit();
      }
    } else {
      openWaring();
    }
  } catch (error) {
    openWaring();
  }
};
//删除代码
const deleteRow = async (groupIndex: number, row: any) => {
  tableData.value.splice(groupIndex, 1)
  editingIndex.value = { groupIndex }
  deleteId.value = row._id
  await deleteHeader()
}
const deleteRowSed = async (groupIndex: number, tabIndex: number, row: any) => {
  tableData.value[groupIndex].tab_list.splice(tabIndex, 1)
  editingIndex.value = { groupIndex }
  await updateHeader()
}
const resetData = () => {
  formData.value._id = ''
  formData.value.group_name = ''
  formData.value.style_des = ''
  formData.value.group_name_url = ''
  formData.value.tab_name = ''
  formData.value.tab_name_url = ''
}
//清空的代码
//刷新的代码
onMounted(async () => {
  await refetchNav
})
</script>

<style scoped>
a.navbar {
  text-decoration: none; /* 去掉链接的下划线 */
  color: inherit; /* 继承父元素的文字颜色 */
}
</style>
