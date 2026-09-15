<script setup lang="ts">
import { ImageCropper } from "@bysages/vue";
</script>

<template>
  <ImageCropper.Root>
    <ImageCropper.Viewport>
      <ImageCropper.Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        alt="A mountain valley under morning light"
      />
      <ImageCropper.Selection>
        <ImageCropper.Handle v-for="position in ['nw', 'ne', 'se', 'sw']" :key="position" :position="position">
          <div />
        </ImageCropper.Handle>
        <ImageCropper.Grid axis="horizontal" />
        <ImageCropper.Grid axis="vertical" />
      </ImageCropper.Selection>
    </ImageCropper.Viewport>
  </ImageCropper.Root>
</template>
