<script setup lang="ts">
import { ConfigProvider } from "@bysages/vue";

import Shell from "../../components/apps/mobile/shell.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Mobile registers example",
  description:
    "The classic open mobile sample station, replicated whole and live: one interactive phone app running twice — missive 家书 and dispatch 公牍 — every page, dialog and toast clickable.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/mobile",
]
  .filter(Boolean)
  .join("/");
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="Mobile Registers"
      lede="The open handheld sample station, replicated whole: one index of grouped cells, every entry opening a live page — buttons, forms, lists, badges, progress, dialogs, toasts, a result page and a working tab bar. The same app runs twice, speaking missive 家书 and dispatch 公牍, each frame pinned to its scene and pigment by ConfigProvider."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas class="mx-auto w-full max-w-[56rem] p-6">
      <div class="flex flex-wrap items-start justify-center gap-8">
        <ConfigProvider scene="missive" accent="feicui" class="min-w-0 max-w-full">
          <Shell />
        </ConfigProvider>
        <ConfigProvider scene="dispatch" accent="jilan" class="min-w-0 max-w-full">
          <Shell />
        </ConfigProvider>
      </div>
    </ExampleCanvas>
  </div>
</template>
