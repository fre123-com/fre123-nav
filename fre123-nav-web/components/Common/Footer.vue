<template>
  <footer
    class="text-left text-[#6c757d] p-6 bg-[rgba(248,249,250,1)] h-[70px]"
  >
    <section class="flex justify-center">
      <!-- Left -->
      <div class="text-[14px] h-[30px]">
        <span
          >Powered by
          <a
            href="https://www.fre123.com"
            target="_blank"
            class="decoration-transparent text-[#a4715c]"
            >FRE123</a
          >
        </span>
      </div>
      <!-- Left -->

      <div v-if="footerConfig?.right?.is_show" class="flex-grow"></div>
      <!-- Right -->
      <div
        v-if="
          footerConfig?.right?.is_show && footerConfig?.right.list.length > 0
        "
        class="flex text-[20px] text-black"
      >
        <a
          v-for="item in footerConfig?.right.list"
          :href="item.url"
          target="_blank"
          class="pr-6"
        >
          <img
            v-if="item.img"
            :src="item.img"
            class="w-[20px] h-[20px]"
            alt=""
          />
          <IconsFontAwesome
            v-else
            :size="item.icon_size"
            class="hover:text-[#0d6efd]"
            :icon="item.icon_class"
          />
        </a>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { CONFIG_KEY_FOOTER, getSiteConfigItem } from "~/stores/config";

const footerConfig = await getSiteConfigItem(CONFIG_KEY_FOOTER);
</script>

<style scoped></style>
