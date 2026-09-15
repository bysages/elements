<script setup lang="ts">
import { Button } from "@bysages/vue";

defineProps<{
  error?: { statusCode?: number; statusMessage?: string; message?: string };
}>();

const { t, isEnabled, localeOf } = useDocsI18n();
const route = useRoute();

// A reader on the zh shelf lands back on the zh root, not the bare `/`
// (which belongs to no locale under i18n).
const home = computed(() => (isEnabled.value ? `/${localeOf(route.path)}` : "/"));

useHead({ htmlAttrs: { lang: () => (isEnabled.value ? localeOf(route.path) : undefined) } });

function goHome() {
  clearError({ redirect: home.value });
}
</script>

<template>
  <div class="bs-docs-error">
    <p class="bs-docs-error-code">{{ error?.statusCode ?? 500 }}</p>
    <h1 class="bs-docs-error-title">
      {{
        error?.statusCode === 404
          ? t("common.error.title")
          : error?.statusMessage || t("common.error.title")
      }}
    </h1>
    <Button variant="solid" size="md" @click="goHome">{{ t("common.error.back") }}</Button>
  </div>
</template>
