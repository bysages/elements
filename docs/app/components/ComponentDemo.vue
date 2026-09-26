<script setup lang="ts">
import { Button, Tabs } from "@bysages/vue";
import { computed, ref } from "vue";

import workbenchLinks from "~/storybook-links.json";

// A live example: the canvas renders the real example component from
// app/components/examples, the code tab shows its source verbatim. The
// name prop is the path under examples/ without the extension —
// `badge/basic` renders examples/badge/basic.vue. No slot: MDC feeds a
// self-closing tag's following section into it, swallowing the page.
const props = defineProps<{ name: string }>();

const modules = import.meta.glob<{ default: any }>("~/components/examples/**/*.vue", {
  eager: true,
});
const sourceLoaders = import.meta.glob<string>("~/components/examples/**/*.vue", {
  query: "?raw",
  import: "default",
});

const path = computed(() => `/components/examples/${props.name}.vue`);
const demo = computed(() => modules[path.value]?.default);
// The source rides in lazy raw chunks — the setup await resolves before
// the highlight fetch and the copy button read it.
const code = ref((await sourceLoaders[path.value]?.().catch(() => "")) ?? "");

// The interactive workbench rides the same domain at /storybook/ — the
// links file is generated from the workbench's own build index, so a
// demo deep-links to the exact story that renders it.
const storyId = (workbenchLinks as Record<string, string>)[props.name];
const workbenchHref = computed(() => (storyId ? `/storybook/?path=/story/${storyId}` : undefined));

const copied = ref(false);
const { t } = useDocsI18n();

async function copy() {
  await navigator.clipboard.writeText(code.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}

// The code tab rides the same shiki pipeline as the markdown blocks —
// server-highlighted once, then carried in the payload.
const { data: highlighted } = await useAsyncData(
  `demo-code:${props.name}`,
  () =>
    $fetch<string>("/api/highlight", { method: "POST", body: { code: code.value, lang: "vue" } }),
  { default: () => "" },
);
</script>

<template>
  <div class="bs-docs-demo">
    <Tabs.Root class="bs-docs-demo-tabs" default-value="preview">
      <Tabs.List>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger v-if="code" value="code">Code</Tabs.Trigger>
        <!-- The demo's path under examples/, quiet ink between the tabs
             and the workbench door — a family page stacks several demos
             and the reader should know which one is on stage. -->
        <span class="font-mono text-xs text-tertiary">{{ name }}</span>
        <a
          v-if="workbenchHref"
          class="bs-docs-demo-workbench"
          :href="workbenchHref"
          target="_blank"
          rel="noreferrer"
        >
          {{ t("docs.workbench") }}
          <Icon name="i-lucide-external-link" />
        </a>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="preview">
        <div class="bs-docs-demo-canvas">
          <component :is="demo" v-if="demo" />
          <p v-else class="bs-docs-demo-missing">No example yet.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content v-if="code" value="code">
        <!-- The code pane shares the printed-block vessel of the markdown
             blocks: label bar on top, copy at its end. shiki's own
             pre/code lands inside; the plain pre is the fallback while
             the highlight route is unreachable. -->
        <div class="bs-docs-pre bs-docs-demo-code-panel">
          <div class="bs-docs-pre-bar">
            <span class="bs-docs-pre-label">{{ name }}.vue</span>
            <Button
              variant="ghost"
              size="sm"
              :aria-label="copied ? t('docs.copy.copied') : t('docs.copy.code')"
              @click="copy"
            >
              {{ copied ? t("docs.copy.copied") : t("docs.copy.code") }}
            </Button>
          </div>
          <div v-if="highlighted" class="bs-docs-demo-code" v-html="highlighted"></div>
          <pre v-else class="bs-docs-demo-code"><code>{{ code }}</code></pre>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</template>
