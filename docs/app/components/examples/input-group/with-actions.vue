<script setup lang="ts">
import { Button, Icon, Input, InputGroup } from "@bysages/vue";
</script>

<template>
  <InputGroup class="max-w-96">
    <InputGroup.Addon>
      <Button variant="ghost" square aria-label="Insert handle">
        <Icon name="rotate-cw" />
      </Button>
    </InputGroup.Addon>
    <Input placeholder="username" />
    <InputGroup.Addon>.com</InputGroup.Addon>
  </InputGroup>
</template>
