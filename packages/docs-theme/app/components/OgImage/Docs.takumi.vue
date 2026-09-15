<script lang="ts" setup>
/** OG cards render outside the app DOM, so the token pipeline never
 * reaches them: the paper-and-ink palette is inlined here instead. */
const { title, description, headline } = defineProps<{
  title?: string;
  description?: string;
  headline?: string;
}>();
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #f6f1e7;
      padding: 72px 80px;
      font-family: sans-serif;
    "
  >
    <p
      v-if="headline"
      style="
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #2e5e8c;
      "
    >
      {{ headline }}
    </p>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center">
      <h1
        v-if="title"
        style="
          margin: 0;
          font-family: serif;
          font-size: 60px;
          font-weight: 600;
          line-height: 1.15;
          color: #1a1a18;
          max-width: 980px;
        "
      >
        {{ title?.slice(0, 60) }}
      </h1>
      <p
        v-if="description"
        style="
          margin: 22px 0 0;
          font-size: 26px;
          line-height: 1.45;
          color: #57534a;
          max-width: 920px;
        "
      >
        {{ description?.slice(0, 180) }}
      </p>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        gap: 14px;
        border-top: 1px solid #d8d0c0;
        padding-top: 24px;
      "
    >
      <div style="width: 12px; height: 12px; background: #c3402f; border-radius: 3px" />
      <span style="font-size: 20px; letter-spacing: 0.02em; color: #8a8578"
        >Elements — By Sages</span
      >
    </div>
  </div>
</template>
