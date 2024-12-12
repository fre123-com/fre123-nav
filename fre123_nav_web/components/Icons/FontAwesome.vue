<template>
	<div><FontAwesomeIcon :icon="icon" :style="{ 'font-size': `${size}px` }" /></div>
</template>
<script setup>
import { library, config } from '@fortawesome/fontawesome-svg-core' //引入图标库
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faUserSecret } from '@fortawesome/fontawesome-svg-core'

//引入vue支持库
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//因为默认添加了 nuxt会造成一些错误，所以不自动添加样式
config.autoAddCss = false
//将图标添加到库中
library.add(fab)
library.add(fas)
library.add(far)
// library.add(faUserSecret)

const props = defineProps({
	icon: {
		type: String,
		require: true,
		default: '',
	},
	size: {
		type: Number,
		require: false,
		default: 20,
	},
})
</script>
