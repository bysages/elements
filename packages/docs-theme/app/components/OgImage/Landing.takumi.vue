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

const { title, description } = defineProps<{
  title?: string;
  description?: string;
}>();

const app = useAppConfig() as { docs?: { name?: string } };
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
    <div style="display: flex; align-items: center; gap: 14px">
      <div
        :style="{ background: palette.seal }"
        style="width: 18px; height: 18px; border-radius: 4px"
      />
      <span :style="{ color: palette.text }" style="font-size: 24px; letter-spacing: 0.02em">{{
        app.docs?.name ?? "Elements"
      }}</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center">
      <h1
        v-if="title"
        :style="{ color: palette.ink }"
        style="
          margin: 0;
          font-family: serif;
          font-size: 64px;
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
        style="margin: 24px 0 0; font-size: 28px; line-height: 1.45; max-width: 920px"
      >
        {{ description?.slice(0, 180) }}
      </p>
    </div>

    <div
      :style="{ borderTopColor: palette.hairline }"
      style="border-top: 1px solid; padding-top: 24px"
    >
      <span :style="{ color: palette.quietText }" style="font-size: 20px; letter-spacing: 0.02em"
        >By Sages</span
      >
    </div>
  </div>
</template>
