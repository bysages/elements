<script setup lang="ts">
import { Descriptions } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: 1.5rem; inline-size: 100%">
    <Descriptions.Root>
      <Descriptions.Item>
        <Descriptions.Term>Medium</Descriptions.Term>
        <Descriptions.Detail>Ink on xuan paper</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Dated</Descriptions.Term>
        <Descriptions.Detail>Autumn, 1935</Descriptions.Detail>
      </Descriptions.Item>
      <Descriptions.Item>
        <Descriptions.Term>Seal</Descriptions.Term>
        <Descriptions.Detail>Zhusha, square-cut</Descriptions.Detail>
      </Descriptions.Item>
    </Descriptions.Root>
    <Descriptions.Root layout="vertical">
      <Descriptions.Item>
        <Descriptions.Term>Provenance</Descriptions.Term>
        <Descriptions.Detail>Acquired from the studio of the second master</Descriptions.Detail>
      </Descriptions.Item>
    </Descriptions.Root>
  </div>
</template>
