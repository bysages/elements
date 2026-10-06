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
            <TagsInput.ItemDeleteTrigger
              ><svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" /></svg
            ></TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>
      </TagsInput.Context>
      <TagsInput.Input placeholder="Add pigment" />
      <TagsInput.ClearTrigger
        ><svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6 6 18" /></svg
      ></TagsInput.ClearTrigger>
    </TagsInput.Control>
    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
