<script setup lang="ts">
import { Banner, Button } from "@bysages/vue";
</script>

<template>
  <Banner.Root>
    <Banner.Body>
      <Banner.Title>Scheduled maintenance</Banner.Title>
      <Banner.Description>
        The reading room closes early this Friday, at four in the afternoon.
      </Banner.Description>
      <Banner.Actions>
        <Button variant="outline" size="sm">View schedule</Button>
      </Banner.Actions>
    </Banner.Body>
    <Banner.Close />
  </Banner.Root>
</template>
