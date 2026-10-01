<script setup lang="ts">
import { rotate_cw } from "@bysages/icons";
import { Button, Icon, Input, InputGroup } from "@bysages/vue";
</script>

<template>
  <InputGroup class="max-w-96">
    <InputGroup.Addon>
      <Button variant="ghost" square aria-label="Insert handle">
        <Icon :glyph="rotate_cw" />
      </Button>
    </InputGroup.Addon>
    <Input placeholder="username" />
    <InputGroup.Addon>.com</InputGroup.Addon>
  </InputGroup>
</template>
