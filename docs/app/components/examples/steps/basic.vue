<script setup lang="ts">
import { Steps } from "@bysages/vue";
</script>

<template>
  <Steps.Root :count="3">
    <Steps.List>
      <Steps.Item v-for="(title, index) in ['Account', 'Profile', 'Confirm']" :key="title" :index="index">
        <Steps.Trigger>
          <Steps.Indicator>{{ index + 1 }}</Steps.Indicator>
          <span>{{ title }}</span>
        </Steps.Trigger>
        <Steps.Separator />
      </Steps.Item>
    </Steps.List>
  </Steps.Root>
</template>
