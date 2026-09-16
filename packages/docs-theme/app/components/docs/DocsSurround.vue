<script setup lang="ts">
import { Button } from "@bysages/vue";

const { t } = useDocsI18n();

defineProps<{ surround?: Array<{ title: string; path: string; description?: string }> | null }>();
</script>

<template>
  <nav class="bs-docs-surround" aria-label="Pagination">
    <Button v-if="surround?.[0]" variant="outline" size="sm" as-child>
      <NuxtLink :to="surround[0].path" class="bs-docs-surround-link">
        <span class="bs-docs-surround-direction">{{ t("docs.prev") }}</span>
        {{ surround[0].title }}
      </NuxtLink>
    </Button>
    <span v-else aria-hidden="true" />
    <Button v-if="surround?.[1]" variant="outline" size="sm" as-child>
      <NuxtLink :to="surround[1].path" class="bs-docs-surround-link is-next">
        <span class="bs-docs-surround-direction">{{ t("docs.next") }}</span>
        {{ surround[1].title }}
      </NuxtLink>
    </Button>
  </nav>
</template>
