<script setup lang="ts">
import UnghApp from "../../components/apps/github/ungh-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "GitHub Profile example",
  description:
    "A contributor's profile page — identity column, an ink-ladder contribution wall drawn from chart cells, and a repository index — built from Elements components.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/github",
]
  .filter(Boolean)
  .join("/");
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="GitHub Profile"
      lede="DemoMacro's home on GitHub, fed live by the ungh API: the real avatar and repository index — every star, fork, and date below is the account as it stands today."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas class="p-6">
      <UnghApp />
    </ExampleCanvas>
  </div>
</template>
