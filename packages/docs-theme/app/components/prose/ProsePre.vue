<script setup lang="ts">
import { Button } from "@bysages/vue";

import { highlightFence } from "../../../utils/highlight";

// Nuxt Content hands the fence's own attributes down as attrs — they
// must land on the `pre` itself, not on the wrapping panel. The body
// is re-inked at render time from the `code`/`language` props: the
// stored AST keeps code blocks as plain text, so render is the only
// place a highlighter can act.
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
}>();

const html = computed(() => (props.code ? highlightFence(props.code, props.language) : ""));

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
    <pre v-bind="$attrs"><code v-if="code" class="th-code" v-html="html" /><slot v-else /></pre>
  </div>
</template>
