<script setup lang="ts">
import { chevron_down } from "@bysages/icons";
import { Icon, Menu } from "@bysages/vue";
</script>

<template>
  <Menu.Root>
    <Menu.Trigger>
      <span>File</span>
      <Menu.Indicator>
        <Icon :glyph="chevron_down" />
      </Menu.Indicator>
    </Menu.Trigger>
    <Teleport to="body">
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new-file">New file</Menu.Item>
          <Menu.Item value="open" disabled>Open…</Menu.Item>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Save</Menu.ItemGroupLabel>
            <Menu.Item value="save">Save</Menu.Item>
            <Menu.Item value="save-as">Save as…</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="export">Export</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>
