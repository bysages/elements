<script setup lang="ts">
import { Toc } from "@bysages/vue";
import { ref } from "vue";

const items = [
  { value: "materials", depth: 2, label: "Materials" },
  { value: "brushwork", depth: 2, label: "Brushwork" },
  { value: "mounting", depth: 2, label: "Mounting" },
];

const scroller = ref<HTMLElement | null>(null);
const scrollEl = () => scroller.value;
</script>

<template>
  <div
    style="display: flex; inline-size: 100%; justify-content: flex-start; gap: var(--bs-space-6)"
  >
    <Toc.Root :items="items" :scroll-el="scrollEl" style="inline-size: 12rem; flex: none">
      <Toc.Nav>
        <Toc.Title>On this page</Toc.Title>
        <Toc.List>
          <Toc.Item v-for="item in items" :key="item.value" :item="item">
            <Toc.Link :href="`#${item.value}`">{{ item.label }}</Toc.Link>
          </Toc.Item>
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
    <div
      ref="scroller"
      style="flex: 1; height: 16rem; overflow-y: auto; padding-inline-end: var(--bs-space-4)"
    >
      <section v-for="item in items" :id="item.value" :key="item.value">
        <h3>{{ item.label }}</h3>
        <p>Warm paper, ink that reads, hierarchy carried by light.</p>
      </section>
    </div>
  </div>
</template>
