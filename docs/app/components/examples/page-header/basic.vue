<script setup lang="ts">
import { Button, PageHeader } from "@bysages/vue";
</script>

<template>
  <PageHeader.Root>
    <PageHeader.Heading>
      <div class="min-w-0">
        <PageHeader.Title>Ledger of correspondence</PageHeader.Title>
        <PageHeader.Description>
          Every letter in and out of the house, logged and shelved.
        </PageHeader.Description>
      </div>
      <PageHeader.Actions>
        <Button variant="outline" size="sm">Export</Button>
        <Button size="sm">New letter</Button>
      </PageHeader.Actions>
    </PageHeader.Heading>
  </PageHeader.Root>
</template>
