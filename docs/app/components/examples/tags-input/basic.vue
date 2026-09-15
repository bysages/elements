<script setup lang="ts">
import { TagsInput } from "@bysages/vue";
</script>

<template>
  <TagsInput.Root :default-value="['Qinghua', 'Celadon']">
    <TagsInput.Label>Pigments</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Context v-slot="{ value }">
        <TagsInput.Item v-for="(tag, index) in value" :key="index" :index="index" :value="tag">
          <TagsInput.ItemPreview>
            <TagsInput.ItemText>{{ tag }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>×</TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>
      </TagsInput.Context>
      <TagsInput.Input placeholder="Add pigment" />
      <TagsInput.ClearTrigger>×</TagsInput.ClearTrigger>
    </TagsInput.Control>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
