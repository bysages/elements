<script setup lang="ts">
import { Avatar } from "@bysages/vue";

const PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144"><rect width="144" height="144" fill="#b9b2a4"/><circle cx="72" cy="56" r="26" fill="#3a3733"/><path d="M24 132c6-30 26-44 48-44s42 14 48 44" fill="#3a3733"/></svg>`,
  );
</script>

<template>
  <div class="flex items-center gap-(--bs-gap-md)">
    <Avatar name="Sage" :src="PORTRAIT" />
    <Avatar name="Mo Ke" />
    <Avatar name="Ink Seal" shape="square" />
  </div>
</template>
