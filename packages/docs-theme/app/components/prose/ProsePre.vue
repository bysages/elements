<script setup lang="ts">
import { Button } from "@bysages/vue";

// Nuxt Content hands the shiki class and its theme variables down as
// attrs — they must land on the `pre` itself (the generated color rules
// key on `pre.shiki`), not on the wrapping panel.
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
}>();

const copied = ref(false);

const { t } = useDocsI18n();

async function copy() {
  await navigator.clipboard.writeText(props.code ?? "");
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <div class="bs-docs-pre">
    <div class="bs-docs-pre-bar">
      <span class="bs-docs-pre-label">{{ filename ?? language }}</span>
      <Button
        variant="ghost"
        size="sm"
        :aria-label="copied ? t('docs.copy.copied') : t('docs.copy.code')"
        @click="copy"
      >
        {{ copied ? t("docs.copy.copied") : t("docs.copy.code") }}
      </Button>
    </div>
    <pre v-bind="$attrs"><slot /></pre>
  </div>
</template>
