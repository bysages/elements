<script setup lang="ts">
const app = useAppConfig();
const { isEnabled, localeOf } = useDocsI18n();
const route = useRoute();

// Back to the reader's own shelf root. The bare `/` opts out of i18n
// (it redirects to the default locale), so `localePath('/')` has no
// localized answer — the root is the locale's own first segment.
const home = computed(() => (isEnabled.value ? `/${localeOf(route.path)}` : "/"));

const ariaLabel = app.docs.name;
</script>

<template>
  <NuxtLink :to="home" class="bs-docs-brand" :aria-label="ariaLabel">
    <AppHeaderLogo />
  </NuxtLink>
</template>
