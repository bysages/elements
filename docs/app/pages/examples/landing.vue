<script setup lang="ts">
import LandingApp from "../../components/apps/landing/landing-app.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Marketing Landing example",
  description:
    "A letterpress studio's public face — sticky nav, serif hero, wordmark wall, and a masonry press gallery — built from Elements components.",
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/landing",
]
  .filter(Boolean)
  .join("/");
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="Marketing Landing"
      lede="A letterpress studio's public face: a sticky nav, a serif hero with a type-specimen plate, a wordmark lattice, and a masonry wall of press cards — every section composed from the library."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas>
      <LandingApp />
    </ExampleCanvas>
  </div>
</template>
