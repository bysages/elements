<script setup lang="ts">
import { Button, Popover } from "@bysages/vue";

import { resolveLandingCopy } from "./data";

const { locale } = useI18n();
const copy = computed(() => resolveLandingCopy(locale.value).header);

// The document's smooth scroll carries plain anchors; the CTA is a real
// button, so it walks the same path by hand.
function goTo(hash: string) {
  menuOpen.value = false;
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

const menuOpen = ref(false);
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-sm">
    <div
      class="mx-auto flex h-14 max-w-[64rem] items-center gap-(--bs-gap-xl) px-(--bs-padding-xl)"
    >
      <a href="#top" class="flex items-center gap-(--bs-gap-sm) text-foreground no-underline">
        <span
          class="grid size-5 place-items-center rounded-sm bg-primary text-[0.6875rem] font-semibold text-primary-text"
          aria-hidden="true"
          >S</span
        >
        <span class="text-sm font-semibold">{{ copy.brand }}</span>
      </a>
      <nav
        class="hidden flex-1 items-center gap-(--bs-gap-lg) text-sm text-secondary @min-[48rem]:flex"
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
      <Popover.Root v-model:open="menuOpen">
        <Popover.Trigger as-child>
          <Button
            class="@min-[48rem]:hidden!"
            variant="ghost"
            size="sm"
            square
            :aria-label="copy.navLabel"
          >
            <Icon name="i-lucide-menu" class="size-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content class="w-40">
            <nav class="grid" :aria-label="copy.navLabel">
              <a
                v-for="link in copy.links"
                :key="link.href"
                :href="link.href"
                class="px-(--bs-padding-sm) py-(--bs-padding-sm) text-sm text-secondary no-underline transition-colors hover:text-foreground"
                @click.prevent="goTo(link.href)"
                >{{ link.label }}</a
              >
            </nav>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
      <Button
        class="ml-auto! @min-[48rem]:ml-0!"
        size="sm"
        variant="outline"
        @click="goTo('#contact')"
        >{{ copy.cta }}</Button
      >
    </div>
  </header>
</template>
