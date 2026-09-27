<script setup lang="ts">
import { Icon, PasswordInput } from "@bysages/vue";
</script>

<template>
  <PasswordInput.Root>
    <PasswordInput.Label>Password</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input placeholder="••••••••" />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator>
          <Icon name="eye" />
          <template #fallback>
            <Icon name="eye-off" />
          </template>
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
</template>
