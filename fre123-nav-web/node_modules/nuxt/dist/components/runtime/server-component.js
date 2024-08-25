import { defineComponent, h, ref } from "vue";
import NuxtIsland from "#app/components/nuxt-island";
export const createServerComponent = /* @__NO_SIDE_EFFECTS__ */ (name) => {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: { lazy: Boolean },
    setup(props, { attrs, slots, expose }) {
      const islandRef = ref(null);
      expose({
        refresh: () => islandRef.value?.refresh()
      });
      return () => {
        return h(NuxtIsland, {
          name,
          lazy: props.lazy,
          props: attrs,
          ref: islandRef
        }, slots);
      };
    }
  });
};
