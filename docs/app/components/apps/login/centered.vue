<script setup lang="ts">
import { Card } from "@bysages/vue";

import LoginForm from "./login-form.vue";
</script>

<template>
  <div class="grid min-h-[34rem] place-items-center p-(--bs-padding-xl) sm:p-10">
    <Card class="w-full max-w-sm">
      <Card.Content class="p-(--bs-padding-xl)!">
        <LoginForm />
      </Card.Content>
    </Card>
  </div>
</template>
