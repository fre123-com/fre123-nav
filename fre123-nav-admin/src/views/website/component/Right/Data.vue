<template>
    <div class="table-box-children">
        <el-tabs v-model="activeAvertTab" tab-position="left" class="demo-tabs custom-tabs" @tab-change="tabChange()">
            <el-tab-pane v-for="tab in advertBox" :key="tab.name" :label="tab.label" :name="tab.name"
                class="custom-tab-pane">
            </el-tab-pane>
        </el-tabs>
        <MetaTable :tableData="currentAvertData" :propList="HeaderAdvertChildPropList" @addData="openAddChildDialog"
            @deleteData="deleteChild" @editData="openEditChildDialog" v-if="currentAvertData?.length"
            :isDraggable="true" :isSetTop="isSetTop" rowKey="id" :key="advertTableKey" :operateWidth="105"
            :is-loading="isLoading" @confirm-drag="updateAdvertChildDrag">
            <el-table-column prop="name" />
            <template #url="{ row }">
                <el-tooltip :content="row.url" placement="top">
                    <el-link :href="row.url" target="_blank">
                        <span class="ellipsis-text">{{ row.url }}</span>
                    </el-link>
                </el-tooltip>
            </template>
            <template #is_show="{ row }">
                <el-switch v-model="row.is_show" :active-value="1" :inactive-value="0"
                    @change="saveAdvertSwitchChange(row)">
                </el-switch>
            </template>
        </MetaTable>
        <CommonDialog :dialog-visible="dialogVisible" :title="dialogTitle" :formData="currentFormData"
            :formRules="fieldRules" :saveHandler="currentSaveHandler" :fields="currentFormFields"
            @update:dialogVisible="(val: boolean) => (dialogVisible = val)" />
    </div>
</template>

<script setup lang="ts">
import {
    IChildItem,
    IHeaderGroup,
    IHeaderTotal,
    IRequestBody,
} from "@/api/modules/website/interface";
import CommonDialog from "@/components/Common/CommonDialog.vue";
import MetaTable from "@/components/MetaTable/index.vue";
import { websiteStore } from "@/store/modules/website";
import { errorMessage, successMessage } from "@/utils/notifications";
import {
    advertChildFields,
} from "@/views/website/config/formConfig";
import { HeaderAdvertChildPropList } from "@/views/website/config/tableConfig";
import {
    currentFormData,
    currentFormFields,
    currentSaveHandler,
    dialogTitle,
    dialogVisible,
    fieldRules,
    updateWebsite,
} from "@/views/website/index";
import { computed, onMounted, ref, watch } from "vue";
import { TabType } from "../../interface";
const { websiteParams, refetchWebsite, websiteData } = websiteStore();

const isLoading = ref(false);
const isSetTop = ref(false);

const reloadHeader = async () => {
    isLoading.value = true;
    websiteParams.value.type = TabType.Header;
    await refetchWebsite.value();
    setWebsiteDataToHeaderAdvert();
    isLoading.value = false;
};

const storedData = ref<IHeaderTotal>({
    search_engine: undefined,
    right: [],
});

const setWebsiteDataToHeaderAdvert = () => {
    const newVal = websiteData.value;
    if (newVal?.data) {
        Object.assign(storedData.value, deepClone(newVal.data));
        setHeaderData(storedData.value);
    }
};

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
const setHeaderData = (header: IHeaderTotal) => {
    const rightItems = Array.isArray(header.right) ? header.right : [];
    advertData.value.splice(
        0,
        advertData.value.length,
        ...rightItems.map((item) => ({
            is_show: item.is_show || 0,
            group: {
                name: item.group.name || "",
                url: item.group.url || "",
                children: item.group.children || [],
            },
        }))
    );
};

const requestBody = ref<IRequestBody>({
    type: TabType.Header,
    data: storedData,
});

const updateHeader = async () => {
    try {
        isLoading.value = true;
        await updateWebsite(requestBody.value);
        await reloadHeader();
        successMessage("数据成功保存");
        isLoading.value = false;
    } catch (error) {
        errorMessage("数据保存失败");
        reloadHeader();
    }
};

const activeAvertTab = ref("");
const previousActiveTab = ref<string | null>(null);

const tabChange = () => {
    if (activeAvertTab.value !== "") {
        previousActiveTab.value = activeAvertTab.value;
    }
    initTabChangeDragGroup();
};

const currentAvertData = computed(() => {
    const activeGroup = advertData.value.find(
        (item) => item.group.name === activeAvertTab.value
    );
    return activeGroup ? activeGroup.group.children : [];
});

const advertData = ref<IHeaderGroup[]>([]);

const advertBox = computed(() => {
    return advertData.value.map((item) => {
        return {
            name: item.group.name,
            label: item.group.name,
        };
    });
});

/**
 * @name 链接组拖拽方法逻辑实现
 */
const advertTableKey = ref(0);
const advertSlotKey = ref(0);
const initTabChangeDragGroup = async () => {
    advertTableKey.value++;
    advertSlotKey.value++;
};

/**
 * @name 链接拖拽方法逻辑实现
 */
const updateAdvertChildDrag = async (list: IChildItem[]) => {
    const updatedHeader = deepClone(storedData.value);
    const nginxSection = updatedHeader.search_engine;
    const currentGroup = updatedHeader.right.find(
        (group: IHeaderGroup) => group.group.name === activeAvertTab.value
    );
    if (currentGroup) {
        currentGroup.group.children = [...list];
        updatedHeader.right = updatedHeader.right.map((group: IHeaderGroup) =>
            group.group.name === activeAvertTab.value ? currentGroup : group
        );
        const updatedData = {
            right: updatedHeader.right,
            search_engine: nginxSection,
        };
        requestBody.value.data = updatedData;
        await updateHeader();
        advertTableKey.value++;
    } else {
        errorMessage("未找到当前分组");
    }
};

/**
 * @name 新增链接
 */

//定义子内容的数据结构
const newChild = ref<IChildItem>({ name: "", url: "", is_show: 0 });
const currentGroupIndex = ref<number | null>(null);

const openAddChildDialog = () => {
    const tabName = activeAvertTab.value;
    const index = advertData.value.findIndex(
        (item) => item.group.name === tabName
    );
    if (index >= 0) {
        currentGroupIndex.value = index;
        if (advertData.value[currentGroupIndex.value].group.children.length >= 3) {
            errorMessage("每个分组最多只能有3个子内容");
            return;
        }
        newChild.value = { name: "", url: "", is_show: 0 };
        dialogTitle.value = "新增广告位更多链接";
        currentFormData.value = newChild.value;
        currentSaveHandler.value = addNewAdvertChild;
        currentFormFields.value = advertChildFields;
        dialogVisible.value = true;
    } else {
        console.error("没有当前分组");
    }
};

const addNewAdvertChild = async () => {
    const storedHeader = deepClone(storedData.value);
    if (!storedHeader) return;
    const updatedHeader = storedHeader as IHeaderTotal;
    if (
        currentGroupIndex.value === null ||
        !updatedHeader.right[currentGroupIndex.value]
    )
        return;
    const newChildItem = {
        name: newChild.value.name,
        url: newChild.value.url,
        is_show: newChild.value.is_show,
    };
    updatedHeader.right[currentGroupIndex.value].group.children.push(
        newChildItem
    );
    advertData.value[currentGroupIndex.value].group.children.push(newChildItem);
    requestBody.value.data = updatedHeader;
    await updateHeader();
    newChild.value = { name: "", url: "", is_show: 0 };
    dialogVisible.value = false;
};

/**
 * @name 保存修改方法实现
 */

const updateHeaderAdvert = async () => {
    const storedHeader = deepClone(storedData.value);
    if (storedHeader) {
        const updatedHeader = storedHeader as IHeaderTotal;
        updatedHeader.right = advertData.value.map((item) => ({
            is_show: item.is_show,
            group: {
                name: item.group.name,
                url: item.group.url,
                children: item.group.children,
            },
        }));
        requestBody.value.data = updatedHeader || {};
        await updateHeader();
    } else {
        console.error("本地存储中没有header数据");
    }
};

/**
 * @name 编辑链接
 */

const editAdvertChild = ref<IChildItem>({ name: "", url: "", is_show: 0 });
const initialChildName = ref("");
const openEditChildDialog = (row: IChildItem) => {
    initialChildName.value = row.name;
    editAdvertChild.value = { ...row };
    copyAdvertChild();
};

const copyAdvertChild = () => {
    dialogTitle.value = "编辑广告";
    currentFormData.value = editAdvertChild.value;
    currentSaveHandler.value = saveAdvertChild;
    currentFormFields.value = advertChildFields;
    dialogVisible.value = true;
};

const saveAdvertSwitchChange = (row: IChildItem) => {
    if (!row.name) {
        return;
    }
    updateHeaderAdvert();
};

const saveAdvertChild = () => {
    const advert = editAdvertChild.value;
    const currentCategory = activeAvertTab.value;
    const categoryIndex = advertData.value.findIndex(
        (item) => item.group.name === currentCategory
    );
    if (categoryIndex > -1) {
        const category = advertData.value[categoryIndex];
        const childIndex = category.group.children.findIndex(
            (child) => child.name === initialChildName.value
        );
        if (childIndex > -1) {
            category.group.children[childIndex] = { ...advert };
        }
        advertData.value[categoryIndex] = { ...category };
    }
    updateHeaderAdvert();
    dialogVisible.value = false;
};

/**
 * @name 删除
 */

const deleteChild = (
    child: { name: string; url: string }
) => {
    const groupName = activeAvertTab.value;
    const group = advertData.value.find((item) => item.group.name === groupName);
    if (group) {
        const childIndex = group.group.children.findIndex(
            (c) => c.name === child.name && c.url === child.url
        );
        if (childIndex !== -1) {
            group.group.children.splice(childIndex, 1);
            updateHeaderAdvert();
        } else {
            errorMessage("未找到子内容");
        }
    } else {
        errorMessage("未找到广告分组");
    }
};

const refresh = async () => {
    isLoading.value = true;
    websiteParams.value.type = TabType.Header;
    await refetchWebsite.value();
    isLoading.value = false;
    successMessage("刷新成功");
};
defineExpose({ refresh });

onMounted(async () => {
    isLoading.value = true;
    await reloadHeader();
    if (advertBox.value.length > 0) {
        activeAvertTab.value = advertBox.value[0].name;
    }
    isLoading.value = false;
});
</script>