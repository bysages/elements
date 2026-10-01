<script setup lang="ts">
import { chevron_left, chevron_right } from "@bysages/icons";
import { Carousel, Icon } from "@bysages/vue";

const slides = ["Chapter One", "Chapter Two", "Chapter Three"];
</script>

<template>
  <Carousel.Root :slide-count="slides.length">
    <Carousel.Control>
      <Carousel.PrevTrigger>
        <Icon :glyph="chevron_left" />
      </Carousel.PrevTrigger>
      <Carousel.ProgressText />
      <Carousel.NextTrigger>
        <Icon :glyph="chevron_right" />
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
