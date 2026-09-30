<script setup lang="ts">
import { Button } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).header);

// The document's smooth scroll carries plain anchors; the CTA is a real
// button, so it walks the same path by hand.
function goTo(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-[64rem] items-center gap-6 px-6">
      <a href="#top" class="flex items-center gap-2 text-foreground no-underline">
        <span
          class="grid size-5 place-items-center rounded-sm bg-primary text-[0.6875rem] font-semibold text-primary-text"
          aria-hidden="true"
          >S</span
        >
        <span class="text-sm font-semibold">{{ copy.brand }}</span>
      </a>
      <nav
        class="hidden flex-1 items-center gap-5 text-sm text-secondary sm:flex"
        :aria-label="copy.navLabel"
      >
        <a
          v-for="link in copy.links"
          :key="link.href"
          :href="link.href"
          class="text-secondary no-underline transition-colors hover:text-foreground"
          >{{ link.label }}</a
        >
      </nav>
      <Button class="ml-auto! sm:ml-0!" size="sm" @click="goTo('#contact')">{{ copy.cta }}</Button>
    </div>
  </header>
</template>
