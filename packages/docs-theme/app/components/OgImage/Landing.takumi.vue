<script lang="ts" setup>
/** OG cards render outside the app DOM, so the token pipeline never
 * reaches them: the paper-and-ink palette is inlined here instead. */
const { title, description } = defineProps<{
  title?: string;
  description?: string;
}>();

const app = useAppConfig() as { docs?: { name?: string } };
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
    <div style="display: flex; align-items: center; gap: 14px">
      <div style="width: 18px; height: 18px; background: #c3402f; border-radius: 4px" />
      <span style="font-size: 24px; letter-spacing: 0.02em; color: #57534a">{{
        app.docs?.name ?? "Elements"
      }}</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center">
      <h1
        v-if="title"
        style="
          margin: 0;
          font-family: serif;
          font-size: 64px;
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
          margin: 24px 0 0;
          font-size: 28px;
          line-height: 1.45;
          color: #57534a;
          max-width: 920px;
        "
      >
        {{ description?.slice(0, 180) }}
      </p>
    </div>

    <div style="border-top: 1px solid #d8d0c0; padding-top: 24px">
      <span style="font-size: 20px; letter-spacing: 0.02em; color: #8a8578">By Sages</span>
    </div>
  </div>
</template>
