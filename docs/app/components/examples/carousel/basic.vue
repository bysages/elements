<script setup lang="ts">
import { Carousel } from "@bysages/vue";

const slides = ["Chapter One", "Chapter Two", "Chapter Three"];
</script>

<template>
  <Carousel.Root :slide-count="slides.length">
    <Carousel.Control>
      <Carousel.PrevTrigger>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Carousel.PrevTrigger>
      <Carousel.ProgressText />
      <Carousel.NextTrigger>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(slide, i) in slides" :key="slide" :index="i">
        {{ slide }}
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, i) in slides" :key="i" :index="i" />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>
