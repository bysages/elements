<script setup lang="ts">
import { SegmentGroup } from "@bysages/vue";
import { computed, ref } from "vue";

import CenteredLogin from "../../components/apps/login/centered.vue";
import OtpLogin from "../../components/apps/login/otp.vue";
import SplitLogin from "../../components/apps/login/split.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Login example",
      description:
        "Three doors into the same workbench — a centered card, a split panel in the house ink, and a one-time code.",
    },
    header: {
      kicker: "Example",
      title: "Login",
      lede: "Three takes on the front door: a centered card, a split panel wearing the house ink, and a two-step one-time code. Every state is local — sign in, verify, sign out.",
    },
    variants: {
      centered: "Centered card",
      split: "Split panel",
      otp: "One-time code",
    },
  },
  zh: {
    seo: {
      title: "登录示例",
      description: "通向同一间工作台的三扇门：居中卡片、纸墨分屏，以及一次性验证码。",
    },
    header: {
      kicker: "示例",
      title: "登录",
      lede: "前门的三种做法：居中卡片、身着纸墨的分屏，以及两步验证码。登录、验证、退出，全部状态都在本地。",
    },
    variants: {
      centered: "居中卡片",
      split: "分屏",
      otp: "一次性验证码",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
});

const variant = ref("centered");
const variants = ["centered", "split", "otp"] as const;
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      :kicker="text.header.kicker"
      :title="text.header.title"
      :lede="text.header.lede"
      class="mb-7"
    />

    <ExampleCanvas>
      <div class="grid gap-6 p-6 sm:p-10">
        <SegmentGroup.Root
          class="mx-auto"
          size="sm"
          :model-value="variant"
          @update:model-value="variant = $event as string"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Item v-for="v in variants" :key="v" :value="v">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>{{ text.variants[v] }}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
        </SegmentGroup.Root>

        <CenteredLogin v-if="variant === 'centered'" />
        <SplitLogin v-else-if="variant === 'split'" />
        <OtpLogin v-else />
      </div>
    </ExampleCanvas>
  </div>
</template>
