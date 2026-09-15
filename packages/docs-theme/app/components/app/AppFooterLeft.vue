<script setup lang="ts">
interface Copyright {
  label?: string;
  url?: string;
}

const app = useAppConfig();
const copyright = computed<Copyright>(() => app.docs.copyright ?? {});
</script>

<template>
  <p>
    © {{ new Date().getFullYear() }}
    <a v-if="copyright.url" :href="copyright.url" target="_blank" rel="noreferrer">
      {{ copyright.label ?? app.docs.name }}
    </a>
    <template v-else>{{ copyright.label ?? app.docs.name }}</template>
  </p>
</template>
