<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { computed } from "vue";

const route = useRoute();
const { localeOf, isEnabled } = useDocsI18n();

const { data: page } = await useAsyncData(() => `landing:${route.path}`, () => {
  // The collection rides the URL's locale segment, evaluated at query
  // time — setup runs mid-transition, before refs settle.
  const collection = isEnabled.value
    ? `landing_${localeOf(route.path).replace("-", "_")}`
    : "landing";
  return queryCollection(collection as keyof Collections).path(route.path).first();
});
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(() => page.value?.seo?.description || page.value?.description);

// The landing's title usually *is* the site name — the global
// `%s · name` template would print the brand twice, so the template
// comes off here.
useHead({ titleTemplate: null });
useSeo({ title, description, type: "website" });
if (!page.value.seo?.ogImage) {
  defineOgImage("Landing", {
    title: title.value?.slice(0, 60),
    description: formatOgDescription(title.value, description.value),
  });
}
</script>

<template>
  <div class="bs-docs-landing">
    <!-- A bare element root animates cleanly under the page transition;
         NuxtLayout here would nest a second layout shell. The remark
         sits inside the div: since Vue 3.4, root-level comments stay in
         the render output and break the single-root check. -->
    <ContentRenderer :value="page as Record<string, any>" class="bs-docs-prose" />
  </div>
</template>
