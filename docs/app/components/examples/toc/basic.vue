<script setup lang="ts">
import { Toc } from "@bysages/vue";
import { ref } from "vue";

const items = [
  { value: "basic-materials", depth: 2, label: "Materials" },
  { value: "basic-brushwork", depth: 2, label: "Brushwork" },
  { value: "basic-mounting", depth: 2, label: "Mounting" },
];

const scroller = ref<HTMLElement | null>(null);
const scrollEl = () => scroller.value;
</script>

<template>
  <div class="flex w-full justify-start gap-6">
    <div class="w-48 flex-none">
      <Toc :items="items" :scroll-el="scrollEl" />
    </div>
    <div ref="scroller" class="h-64 flex-1 overflow-y-auto pe-4">
      <section v-for="item in items" :id="item.value" :key="item.value">
        <h3>{{ item.label }}</h3>
        <p>Warm paper, ink that reads, hierarchy carried by light.</p>
      </section>
    </div>
  </div>
</template>
