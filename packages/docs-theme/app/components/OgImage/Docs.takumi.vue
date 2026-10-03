<script lang="ts" setup>
import tokens from "@bysages/tokens";

/** OG cards render outside the app DOM, so CSS variables cannot reach
 * them; the renderer gets the same token values as concrete colors. */
const colorTokens = tokens as Record<string, string>;
const palette = {
  paper: colorTokens["bs-color-gray-50"],
  ink: colorTokens["bs-color-gray-900"],
  text: colorTokens["bs-color-gray-700"],
  quietText: colorTokens["bs-color-gray-600"],
  hairline: colorTokens["bs-color-gray-200"],
  headline: colorTokens["bs-color-brand-700"],
  seal: colorTokens["bs-color-zhusha-600"],
};

const { title, description, headline } = defineProps<{
  title?: string;
  description?: string;
  headline?: string;
}>();
</script>

<template>
  <div
    :style="{ background: palette.paper }"
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 72px 80px;
      font-family: sans-serif;
    "
  >
    <p
      v-if="headline"
      :style="{ color: palette.headline }"
      style="
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      "
    >
      {{ headline }}
    </p>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center">
      <h1
        v-if="title"
        :style="{ color: palette.ink }"
        style="
          margin: 0;
          font-family: serif;
          font-size: 60px;
          font-weight: 600;
          line-height: 1.15;
          max-width: 980px;
        "
      >
        {{ title?.slice(0, 60) }}
      </h1>
      <p
        v-if="description"
        :style="{ color: palette.text }"
        style="margin: 22px 0 0; font-size: 26px; line-height: 1.45; max-width: 920px"
      >
        {{ description?.slice(0, 180) }}
      </p>
    </div>

    <div
      :style="{ borderTopColor: palette.hairline }"
      style="
        display: flex;
        align-items: center;
        gap: 14px;
        border-top: 1px solid;
        padding-top: 24px;
      "
    >
      <div
        :style="{ background: palette.seal }"
        style="width: 12px; height: 12px; border-radius: 3px"
      />
      <span :style="{ color: palette.quietText }" style="font-size: 20px; letter-spacing: 0.02em"
        >Elements — By Sages</span
      >
    </div>
  </div>
</template>
