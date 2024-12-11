<template>
	<div class="text-surprise-container">
		<span v-if="surprise.allowed_close" class="close-btn" @click="hideSurprise">
			<svg
				width="10"
				height="10"
				viewBox="0 0 10 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.21042 8.46042L4.99954 5.67129L7.78866 8.46042L7.85938 8.53113L7.93009 8.46042L8.46042 7.93009L8.53113 7.85938L8.46042 7.78866L5.67129 4.99954L8.46042 2.21042L8.53113 2.13971L8.46042 2.06899L7.93009 1.53866L7.85938 1.46795L7.78866 1.53866L4.99954 4.32779L2.21042 1.53866L2.13971 1.46795L2.06899 1.53866L1.53866 2.06899L1.46795 2.13971L1.53866 2.21042L4.32779 4.99954L1.53866 7.78866L1.46795 7.85938L1.53866 7.93009L2.06899 8.46042L2.13971 8.53113L2.21042 8.46042Z"
					fill="#26221E"
					stroke="#26221E"
					stroke-width="0.2"
				/>
			</svg>
		</span>
		<component
			:is="`${surprise.url ? 'a' : 'div'}`"
			:href="surprise.url"
			target="_blank"
			rel="nofollow"
			class="hover:text-[rgb(207,50,66)]"
		>
			{{ surprise.title }}
		</component>
	</div>
</template>

<script setup lang="ts">
import type { ISurpriseItem } from '~/interface/surprise'

const props = defineProps<{
	surprise: ISurpriseItem
}>()

const emits = defineEmits(['surprise:close'])
const hideSurprise = () => {
	emits('surprise:close', props.surprise)
}
</script>

<style scoped>
.text-surprise-container {
	@apply bg-white py-4 px-6 text-lg text-[#943131] shadow-[0_4px_8px_rgba(0,0,0,0.1)] rounded-[10px]  border-[1px] border-[rgba(0,0,0,.125)] cursor-pointer;
}

.close-btn {
	@apply absolute top-[5px] right-[5px] cursor-pointer w-[22px] h-[22px] rounded-full bg-white hover:opacity-80 transition-all flex items-center justify-center md:shadow-common-box shadow-common-box-mobile hover:scale-110;
	box-shadow: 0px 2px 6px 2px var(--color-pendant-shadow);
}
</style>
