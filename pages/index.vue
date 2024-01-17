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
import navList from '../config/nav.json'
</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3281954914625230"
     crossorigin="anonymous"></script>
<style></style>
