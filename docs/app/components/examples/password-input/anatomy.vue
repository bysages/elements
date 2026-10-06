<script setup lang="ts">
import { eye, eye_off } from "@bysages/icons";
import { Icon, PasswordInput } from "@bysages/vue";
</script>

<template>
  <PasswordInput.Root>
    <PasswordInput.Label>Password</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input placeholder="••••••••" />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator>
          <Icon :glyph="eye" />
          <template #fallback>
            <Icon :glyph="eye_off" />
          </template>
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
</template>
