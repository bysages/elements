<script setup lang="ts">
import { Carousel } from "@bysages/vue";

const slides = ["Chapter One", "Chapter Two", "Chapter Three"];
</script>

<template>
  <Carousel :items="slides" :default-value="1" label="Chapters" />
</template>
