<!--
 * @Description: 
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-01-16 10:35:34
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-22 20:51:23
 * 2024-01-16 10:35:34
-->
<template>
	<!-- 首页顶部搜索 -->
	<div ref="container">
		<!-- 这里是导航列表 -->
		<div id="nav-container">
			<IndexNavGroup v-for="(nav, i) in navList" :idx="i" :groupData="nav"></IndexNavGroup>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { IGroup } from '~/interface/nav'
import { CONFIG_BUSINESS_KEY_NAV, getBusinessConfig } from '~/stores/config'
const navList = (await getBusinessConfig(CONFIG_BUSINESS_KEY_NAV)) as IGroup[]
// 获取初始化位置
</script>
<style></style>
