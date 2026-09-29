<script setup lang="ts">
import { Steps } from "@bysages/vue";

const titles = ["Account", "Profile", "Confirm"];
</script>

<template>
  <Steps.Root :count="titles.length" orientation="vertical" class="w-full">
    <Steps.List>
      <Steps.Item v-for="(title, index) in titles" :key="title" :index="index">
        <Steps.Trigger>
          <Steps.Indicator>{{ index + 1 }}</Steps.Indicator>
          <span>{{ title }}</span>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    </Steps.List>
  </Steps.Root>
</template>
