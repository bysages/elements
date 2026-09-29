<script setup lang="ts">
import { Descriptions } from "@bysages/vue";

const pairs = [
  { term: "Calligrapher", detail: "Lin Wanzhi", span: 1 },
  { term: "Ink", detail: "Qinghua cobalt, first grinding", span: 1 },
  { term: "Inscription", detail: "方寸为章 — the measure held and centered", span: 2 },
  { term: "Paper", detail: "Jingxian xuan, raw edge", span: 1 },
  { term: "Seal", detail: "Square-cut, 6 mm", span: 1 },
];
</script>

<template>
  <!-- One ledger, mixed widths: a pair can hold its one column, or
       stretch across the whole row when the detail asks for it. -->
  <Descriptions.Root bordered :column="2" class="w-full">
    <Descriptions.Item v-for="pair in pairs" :key="pair.term" :span="pair.span">
      <Descriptions.Term>{{ pair.term }}</Descriptions.Term>
      <Descriptions.Detail>{{ pair.detail }}</Descriptions.Detail>
    </Descriptions.Item>
  </Descriptions.Root>
</template>
