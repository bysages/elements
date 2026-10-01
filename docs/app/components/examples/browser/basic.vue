<script setup lang="ts">
import { Browser } from "@bysages/vue";
</script>

<template>
  <Browser class="w-full max-w-125">
    <Browser.TitleBar>
      <Browser.Dots />
      <Browser.UrlBar>https://elements.bysages.com</Browser.UrlBar>
    </Browser.TitleBar>
    <Browser.Body class="flex h-40 items-center justify-center text-sm text-tertiary">
      Whatever the site hangs in the window
    </Browser.Body>
  </Browser>
</template>
