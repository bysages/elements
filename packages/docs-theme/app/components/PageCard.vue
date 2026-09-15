<script setup lang="ts">
import { Card } from "@bysages/vue";

import { NuxtLink } from "#components";

defineProps<{
  to?: string;
  target?: string;
}>();

const { Root, Header, Title, Description, Footer } = Card;
</script>

<template>
  <Root as-child class="bs-docs-page-card">
    <component :is="to ? NuxtLink : 'div'" :to="to" :target="target">
      <div v-if="$slots.icon" class="bs-docs-page-card-icon">
        <slot name="icon" />
      </div>
      <slot v-if="$slots.default" />
      <Header v-if="$slots.title || $slots.description">
        <Title v-if="$slots.title">
          <slot name="title" />
        </Title>
        <Description v-if="$slots.description">
          <slot name="description" />
        </Description>
      </Header>
      <Footer v-if="$slots.links">
        <slot name="links" />
      </Footer>
    </component>
  </Root>
</template>
