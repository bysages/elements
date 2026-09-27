<script setup lang="ts">
import { Checkbox, Icon } from "@bysages/vue";
</script>

<template>
  <div class="grid gap-3 w-full">
    <Checkbox.Root default-checked>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <Icon name="check" />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Ship the register</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <Icon name="check" />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Outline the story</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Checkbox.Root disabled>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <Icon name="check" />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Archived</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  </div>
</template>
