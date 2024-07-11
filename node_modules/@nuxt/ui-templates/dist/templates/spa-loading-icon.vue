<script setup>
const props = defineProps({
  appName: {
    type: String,
    default: "Nuxt"
  },
  version: {
    type: String,
    default: ""
  }
})
</script>
<template>
</template>
<style scoped>
.nuxt-spa-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nuxt-spa-loading>path {
  fill: none;
  stroke: #00DC82;
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 128;
  stroke-dashoffset: 128;
  animation: nuxt-spa-loading-move 3s linear infinite;
}
@keyframes nuxt-spa-loading-move {
  100% {
    stroke-dashoffset: -128;
  }
}
</style>