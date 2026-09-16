<script setup lang="ts">
import { CascadeSelect, type CascadeSelectNode } from "@bysages/vue";
import { ref } from "vue";

const data: CascadeSelectNode[] = [
  {
    label: "广东省",
    value: "gd",
    children: [
      {
        label: "广州市",
        value: "gz",
        children: [
          { label: "越秀区", value: "yuexiu" },
          { label: "天河区", value: "tianhe" },
        ],
      },
      {
        label: "深圳市",
        value: "sz",
        children: [
          { label: "福田区", value: "futian" },
          { label: "南山区", value: "nanshan" },
        ],
      },
    ],
  },
  {
    label: "浙江省",
    value: "zj",
    children: [
      {
        label: "杭州市",
        value: "hz",
        children: [{ label: "西湖区", value: "xihu" }],
      },
    ],
  },
];

const path = ref();
</script>

<template>
  <CascadeSelect
    v-model="path"
    :data="data"
    placeholder="选择省 / 市 / 区"
    style="inline-size: 100%"
  />
</template>
