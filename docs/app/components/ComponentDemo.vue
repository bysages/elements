<script setup lang="ts">
import { Button, Tabs } from "@bysages/vue";
import type { Component } from "vue";
import { computed, defineAsyncComponent, ref } from "vue";

// A live example: the canvas renders the real example component from
// app/components/examples, the code tab shows its source verbatim. The
// name prop is the path under examples/ without the extension —
// `badge/basic` renders examples/badge/basic.vue. No slot: MDC feeds a
// self-closing tag's following section into it, swallowing the page.
const props = defineProps<{ name: string }>();

const demoLoaders = import.meta.glob<{ default: Component }>("~/components/examples/**/*.vue");
const sourceLoaders = import.meta.glob<string>("~/components/examples/**/*.vue", {
  query: "?raw",
  import: "default",
});

const path = computed(() => `/components/examples/${props.name}.vue`);
const demo = computed(() => {
  const loader = demoLoaders[path.value];
  return loader ? defineAsyncComponent(loader) : undefined;
});

// The source and its highlighted twin travel in lazy chunks; the payload
// carries only the one demo's source, never the whole examples tree.
const { data: source } = await useAsyncData(
  `demo-source:${props.name}`,
  async () => (await sourceLoaders[path.value]?.().catch(() => "")) ?? "",
  { default: () => "", watch: [path] },
);
const code = computed(() => source.value ?? "");

const { data: highlighted } = await useAsyncData(
  `demo-code:${props.name}`,
  async () =>
    code.value
      ? await $fetch<string>("/api/highlight", {
          method: "POST",
          body: { code: code.value, lang: "vue" },
        })
      : "",
  { default: () => "", watch: [code] },
);

// The interactive workbench rides the same domain at /storybook/. The
// generated maps are too large for every demo page, so this instance
// fetches only its own two ids and the result joins the server payload.
interface WorkbenchLinks {
  vue?: string;
  react?: string;
}
const { data: storyLinks } = await useAsyncData(
  `demo-links:${props.name}`,
  async (): Promise<WorkbenchLinks> => {
    const [vueLinks, reactLinks] = await Promise.all([
      import("~/storybook-links.json"),
      import("~/storybook-react-links.json"),
    ]);
    return {
      vue: (vueLinks.default as Record<string, string>)[props.name],
      react: (reactLinks.default as Record<string, string>)[props.name],
    };
  },
  {
    default: () => ({}) satisfies WorkbenchLinks,
    watch: [path],
  },
);
const workbenchHref = computed(() =>
  storyLinks.value?.vue ? `/storybook/?path=/story/${storyLinks.value.vue}` : undefined,
);
const reactWorkbenchHref = computed(() =>
  storyLinks.value?.react ? `/storybook/react/?path=/story/${storyLinks.value.react}` : undefined,
);

const copied = ref(false);
const { t } = useDocsI18n();

async function copy() {
  await navigator.clipboard.writeText(code.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <Tabs.Root class="bs-docs-demo" default-value="preview" lazy-mount>
    <Tabs.List>
      <Tabs.Trigger value="preview">{{ t("docs.demo.preview") }}</Tabs.Trigger>
      <Tabs.Trigger v-if="code" value="code">{{ t("docs.demo.code") }}</Tabs.Trigger>
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
        :title="t('docs.workbench')"
        :aria-label="t('docs.workbench')"
      >
        Vue
        <Icon name="i-lucide-external-link" />
      </a>
      <a
        v-if="reactWorkbenchHref"
        class="bs-docs-demo-workbench"
        :href="reactWorkbenchHref"
        target="_blank"
        rel="noreferrer"
        :title="t('docs.workbench')"
        :aria-label="t('docs.workbench')"
      >
        React
        <Icon name="i-lucide-external-link" />
      </a>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content value="preview">
      <div
        class="flex flex-wrap items-center gap-(--bs-gap-md) my-(--bs-padding-sm) mx-(--bs-padding-md) py-(--bs-padding-xl) px-(--bs-padding-lg)"
      >
        <component :is="demo" v-if="demo" />
        <p v-else class="m-0 text-sm text-tertiary">No example yet.</p>
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
        <div
          v-if="highlighted"
          class="m-0 p-(--bs-padding-md) rounded-none bg-transparent overflow-x-auto font-mono text-sm leading-relaxed text-foreground [tab-size:2]"
          v-html="highlighted"
        ></div>
        <pre
          v-else
          class="m-0 p-(--bs-padding-md) rounded-none bg-transparent overflow-x-auto font-mono text-sm leading-relaxed text-foreground [tab-size:2]"
        ><code>{{ code }}</code></pre>
      </div>
    </Tabs.Content>
  </Tabs.Root>
</template>
