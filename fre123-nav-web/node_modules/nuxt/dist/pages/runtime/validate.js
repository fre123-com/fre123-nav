import { createError, showError } from "#app/composables/error";
import { useNuxtApp } from "#app/nuxt";
import { defineNuxtRouteMiddleware, useRouter } from "#app/composables/router";
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.meta?.validate) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = await Promise.resolve(to.meta.validate(to));
  if (result === true) {
    return;
  }
  if (import.meta.server) {
    return result;
  }
  const error = createError({
    statusCode: 404,
    statusMessage: `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
        window.history.pushState({}, "", to.fullPath);
      });
      return false;
    }
  });
});
