<script setup lang="ts">
import LoginForm from "./login-form.vue";

const { locale } = useI18n();

const copy = {
  en: {
    brand: "Songyan Press",
    slogan: "Light as shadow; paper as vessel.",
    sub: "A Huizhou letter room at work — ink in twelve colors, paper at three hundred twenty grams.",
  },
  zh: {
    brand: "松烟印坊",
    slogan: "以光为影，以纸为器。",
    sub: "一间徽州印坊的工作台——墨有十二色，纸有三百二十克。",
  },
} as const;
</script>

<template>
  <div class="grid min-h-[36rem] lg:grid-cols-[1.05fr_1fr]">
    <!-- The house ink holds the left leaf: brand at the top, a serif
         line in the middle, colophon at the bottom — the panel answers
         "whose door is this" before the form asks for a key. -->
    <div class="hidden flex-col justify-between bg-primary p-10 text-primary-text lg:flex">
      <div class="flex items-center gap-(--bs-gap-sm)">
        <span
          class="grid size-6 place-items-center rounded-sm bg-primary-text text-[0.75rem] font-semibold text-primary"
          aria-hidden="true"
          >S</span
        >
        <span class="text-sm font-semibold">{{ copy[locale as "en" | "zh"].brand }}</span>
      </div>
      <div class="grid gap-(--bs-gap-md)">
        <p class="m-0 font-serif text-3xl leading-snug text-balance">
          {{ copy[locale as "en" | "zh"].slogan }}
        </p>
        <p class="m-0 text-sm opacity-80">
          {{ copy[locale as "en" | "zh"].sub }}
        </p>
      </div>
      <p class="m-0 text-xs opacity-60">Songyan Press · Huizhou</p>
    </div>

    <div class="grid place-items-center p-(--bs-padding-xl) sm:p-10">
      <div class="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
