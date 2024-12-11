<template>
  <div class="link-container">
    <div
      class="w-full md:w-[800px] mx-auto bg-primary-bg md:shadow-common-box shadow-common-box-mobile py-5 px-6 flex-grow rounded-lg"
    >
      <div
        v-for="(group, index) in linksData"
        :key="index"
        class="link-container-category-item"
      >
        <h2
          class="text-primary-text leading-[25px] font-semibold text-[18px] mb-4"
        >
          {{ group.name }}
        </h2>
        <div class="link-container-links">
          <a
            v-show="link?.status"
            v-for="(link, num) in group?.list"
            :key="num"
            class="link-container-links-item"
            :href="link.url"
            target="_blank"
            :title="link.name"
            rel="nofollow"
          >
            <img class="w-[20px]" :src="link.logo_url" />
            <p class="truncate">{{ link.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CONFIG_BUSINESS_KEY_FRIENDSHIP_LINK,
  getBusinessConfig,
} from '~/stores/config'
const linksData = await getBusinessConfig(CONFIG_BUSINESS_KEY_FRIENDSHIP_LINK)
</script>

<style scoped lang="scss">
@keyframes runRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(200%);
  }
  50.01% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}

.link-container {
  @apply flex flex-col flex-grow w-full pt-6 pb-9 md:px-0 px-4;
}

.link-container-category-item:last-child {
  .link-container-links {
    @apply mb-0;
  }
}

.link-container-links {
  @apply mb-[30px] grid gap-6;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.link-container-links-item {
  @apply py-3 px-4 rounded-md truncate  text-[14px] leading-5 flex items-center gap-x-[4px]   overflow-hidden;

  .link-container-links-item-icon {
    @apply w-7 h-4 flex items-center justify-center rounded-xl flex-none overflow-hidden transition-all;
  }
}
</style>
