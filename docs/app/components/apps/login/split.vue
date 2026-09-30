<script setup lang="ts">
import LoginForm from "./login-form.vue";
</script>

<template>
  <div class="grid min-h-[36rem] lg:grid-cols-[1.05fr_1fr]">
    <!-- The house ink holds the left leaf: brand at the top, a serif
         line in the middle, colophon at the bottom — the panel answers
         "whose door is this" before the form asks for a key. -->
    <div class="hidden flex-col justify-between bg-primary p-10 text-primary-text lg:flex">
      <div class="flex items-center gap-2">
        <span
          class="grid size-6 place-items-center rounded-sm bg-primary-text text-[0.75rem] font-semibold text-primary"
          aria-hidden="true"
          >S</span
        >
        <span class="text-sm font-semibold">松烟印坊</span>
      </div>
      <div class="grid gap-3">
        <p class="m-0 font-serif text-3xl leading-snug text-balance">以光为影，以纸为器。</p>
        <p class="m-0 text-sm opacity-80">一间徽州印坊的工作台——墨有十二色，纸有三百二十克。</p>
      </div>
      <p class="m-0 text-xs opacity-60">Songyan Press · Huizhou</p>
    </div>

    <div class="grid place-items-center p-6 sm:p-10">
      <div class="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
