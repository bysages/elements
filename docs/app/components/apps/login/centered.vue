<script setup lang="ts">
import { Card } from "@bysages/vue";

import LoginForm from "./login-form.vue";
</script>

<template>
  <div class="grid min-h-[34rem] place-items-center p-6 sm:p-10">
    <Card.Root class="w-full max-w-sm">
      <Card.Content class="p-6!">
        <LoginForm />
      </Card.Content>
    </Card.Root>
  </div>
</template>
