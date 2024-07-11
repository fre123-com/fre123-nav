<script setup>
import { useHead } from '#imports'
const props = defineProps({
  appName: {
    type: String,
    default: "Nuxt"
  },
  version: {
    type: String,
    default: ""
  },
  loading: {
    type: String,
    default: "Loading"
  }
})
useHead({
  title: `${ props.loading } | ${ props.appName }`,
  script: [
    {
      children: `const ANIMATION_KEY = 'nuxt-loading-enable-animation'
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

      let isLowPerformance = checkIsLowPerformance()
      let enableAnimation = localStorage.getItem(ANIMATION_KEY) === 'false'
         ? false
         : localStorage.getItem(ANIMATION_KEY) === 'true'
          ? true
          : !isLowPerformance

      const mouseLight = window.document.getElementById('mouseLight')
      const nuxtImg = window.document.getElementById('nuxtImg')
      const animationToggle = window.document.getElementById('animation-toggle')
      const body = window.document.body
      let bodyRect

      function checkIsLowPerformance() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
         || navigator.hardwareConcurrency < 2
         || navigator.deviceMemory < 1
         // Safari has some performance issue on the blur filter. Remove this when it's fixed.
         || isSafari
      }
      function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.x + (elem.width / 2)), 2) + Math.pow(mouseY - (elem.top + (elem.height / 2)), 2)));
      }
      function onFocusOut() {
        if (!enableAnimation) {
          return
        }
        mouseLight.style.opacity = 0
        nuxtImg.style.opacity = 0.7
      }
      function onMouseMove(e) {
        if (!enableAnimation) {
          return
        }
        const pointerRect = nuxtImg.getBoundingClientRect()
        if (!bodyRect) {
          bodyRect = body.getBoundingClientRect()
        }
        const distance = calculateDistance(pointerRect, e.pageX, e.pageY)
        const size = Math.max((1000 - distance) / 2 / 100, 1)

        mouseLight.style.top = `${e.clientY - bodyRect.y - mouseLight.clientHeight / 2}px`
        mouseLight.style.left = `${e.clientX - mouseLight.clientWidth / 2}px`
        mouseLight.style.width = mouseLight.style.height = `${Math.max(Math.round(size * 100), 300)}px`
        mouseLight.style.filter = `blur(${Math.min(Math.max(size * 50, 100), 160)}px)`
        mouseLight.style.opacity = Math.min(Math.max(size / 4, 0.6), 1)

        const dx = e.pageX - pointerRect.left
        const dy = e.pageY - pointerRect.top
        const logoGradient = `radial-gradient(circle at ${dx}px ${dy}px, black 75%, transparent 100%)`
        nuxtImg.style['-webkit-mask-image'] = logoGradient
        nuxtImg.style['mask-image'] = logoGradient
        nuxtImg.style.opacity = Math.min(Math.max(size / 4, 0.7), 1)
      }

      function toggleAnimation(value = !enableAnimation) {
        enableAnimation = value
        document.body.classList.toggle('visual-effects', enableAnimation)
        if (value) {
          onFocusOut()
          animationToggle.innerText = 'Animation Enabled'
        }
        else {
          mouseLight.style.opacity = 0
          nuxtImg.style.opacity = 1
          nuxtImg.style['mask-image'] = ''
          nuxtImg.style['-webkit-mask-image'] = ''
          animationToggle.innerText = 'Animation Disabled'
        }
        localStorage.setItem(ANIMATION_KEY, enableAnimation ? 'true' : 'false')
      }

      animationToggle.addEventListener('click', () => toggleAnimation(), { passive: true})
      body.addEventListener('mousemove', onMouseMove, { passive: true })
      body.addEventListener('mouseleave', onFocusOut, { passive: true })

      toggleAnimation(enableAnimation)

      if (typeof window.fetch === 'undefined') {
        setTimeout(() => window.location.reload(), 1000)
      } else {
        const check = async () => {
          try {
            const body = await window
              .fetch(window.location.href)
              .then(r => r.text())
            if (!body.includes('__NUXT_LOADING__')) {
              return window
                .location
                .reload()
            }
          } catch  {}
          setTimeout(check, 1000)
        }
        check()
      }`
    }
  ],
  style: [
    {
      children: `;#animation-toggle{position:fixed;padding:10px;top:0;right:0;transition:opacity 0.4s ease-in;opacity:0}#animation-toggle:hover{opacity:0.8}@keyframes gradient{0%{background-position:0 0}100%{background-position:-200% 0}}@media (prefers-color-scheme: dark){html,body{color:white;color-scheme:dark}}*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}button{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none;background-color:transparent;background-image:none;padding:0;line-height:inherit;color:inherit}button{-webkit-appearance:button}button{cursor:pointer}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}svg{display:block;vertical-align:middle}`
    }
  ]
})
</script>
<template>
<div class="visual-effects relative overflow-hidden min-h-screen bg-white dark:bg-black flex flex-col justify-center items-center text-center"><div id="mouseLight" class="absolute top-0 rounded-full mouse-gradient transition-opacity h-[200px] w-[200px]"></div><a href="https://nuxt.com" target="_blank" rel="noopener" class="nuxt-logo z-20"><svg id="nuxtImg" xmlns="http://www.w3.org/2000/svg" width="214" height="53" fill="none" viewBox="0 0 800 200"><path fill="#00DC82" d="M168.303 200h111.522c3.543 0 7.022-.924 10.09-2.679A20.086 20.086 0 0 0 297.3 190a19.855 19.855 0 0 0 2.7-10.001 19.858 19.858 0 0 0-2.709-9.998L222.396 41.429a20.09 20.09 0 0 0-7.384-7.32 20.313 20.313 0 0 0-10.088-2.679c-3.541 0-7.02.925-10.087 2.68a20.082 20.082 0 0 0-7.384 7.32l-19.15 32.896L130.86 9.998a20.086 20.086 0 0 0-7.387-7.32A20.322 20.322 0 0 0 113.384 0c-3.542 0-7.022.924-10.09 2.679a20.091 20.091 0 0 0-7.387 7.319L2.709 170A19.853 19.853 0 0 0 0 179.999c-.002 3.511.93 6.96 2.7 10.001a20.091 20.091 0 0 0 7.385 7.321A20.322 20.322 0 0 0 20.175 200h70.004c27.737 0 48.192-12.075 62.266-35.633l34.171-58.652 18.303-31.389 54.93 94.285h-73.233L168.303 200Zm-79.265-31.421-48.854-.011 73.232-125.706 36.541 62.853-24.466 42.01c-9.347 15.285-19.965 20.854-36.453 20.854Z"></path><path fill="currentColor" d="M377 200a4 4 0 0 0 4-4v-93s5.244 8.286 15 25l38.707 66.961c1.789 3.119 5.084 5.039 8.649 5.039H470V50h-27a4 4 0 0 0-4 4v94l-17-30-36.588-62.98c-1.792-3.108-5.081-5.02-8.639-5.02H350v150h27ZM676.203 143.857 710.551 92h-25.73a9.972 9.972 0 0 0-8.333 4.522L660.757 120.5l-15.731-23.978A9.972 9.972 0 0 0 636.693 92h-25.527l34.348 51.643L608.524 200h24.966a9.969 9.969 0 0 0 8.29-4.458l19.18-28.756 18.981 28.72a9.968 9.968 0 0 0 8.313 4.494h24.736l-36.787-56.143ZM724.598 92h19.714V60.071h28.251V92H800v24.857h-27.437V159.5c0 10.5 5.284 15.429 14.43 15.429H800V200h-16.869c-23.576 0-38.819-14.143-38.819-39.214v-43.929h-19.714V92ZM590 92h-15c-3.489 0-6.218.145-8.5 2.523-2.282 2.246-2.5 3.63-2.5 7.066v52.486c0 8.058-.376 12.962-4 16.925-3.624 3.831-8.619 5-16 5-7.247 0-12.376-1.169-16-5-3.624-3.963-4-8.867-4-16.925v-52.486c0-3.435-.218-4.82-2.5-7.066C519.218 92.145 516.489 92 513 92h-15v62.422c0 14.004 3.892 25.101 11.676 33.292C517.594 195.905 529.103 200 544 200c14.897 0 26.204-4.095 34.123-12.286 7.918-8.191 11.877-19.288 11.877-33.292V92Z"></path></svg> </a><button id="animation-toggle">Animation Enabled</button><div class="nuxt-loader-bar"></div></div>
</template>
<style scoped>
.nuxt-loader-bar{background:repeating-linear-gradient(to right, #36E4DA 0%, #1DE0B1 25%, #00DC82 50%, #1DE0B1 75%, #36E4DA 100%);height:100px;background-size:200% auto;background-position:0 0;animation:gradient 2s infinite;animation-fill-mode:forwards;animation-timing-function:linear;position:fixed;bottom:0;left:0;right:0;height:5px}.visual-effects .nuxt-loader-bar{height:100px;bottom:-50px;left:-50px;right:-50px;filter:blur(100px)}.visual-effects .mouse-gradient{background:repeating-linear-gradient(to right, #00DC82 0%, #1DE0B1 50%, #36E4DA 100%);filter:blur(100px);opacity:0.5}#animation-toggle{position:fixed;padding:10px;top:0;right:0;transition:opacity 0.4s ease-in;opacity:0}#animation-toggle:hover{opacity:0.8}@keyframes gradient{0%{background-position:0 0}100%{background-position:-200% 0}}@media (prefers-color-scheme: dark){html,body{color:white;color-scheme:dark}.nuxt-loader-bar{opacity:0.5}}*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}button{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none;background-color:transparent;background-image:none;padding:0;line-height:inherit;color:inherit}button{-webkit-appearance:button}button{cursor:pointer}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}svg{display:block;vertical-align:middle}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.rounded-full{border-radius:9999px}.flex{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-\[200px\]{height:200px}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.absolute{position:absolute}.relative{position:relative}.top-0{top:0}.text-center{text-align:center}.w-\[200px\]{width:200px}.z-20{z-index:20}.transition-opacity{-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);-o-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transition-duration:.15s;-o-transition-duration:.15s;transition-duration:.15s}@media (prefers-color-scheme: dark){.dark\:bg-black{--tw-bg-opacity:1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}}
</style>