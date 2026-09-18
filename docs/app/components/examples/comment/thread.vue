<script setup lang="ts">
import { Avatar, Comment } from "@bysages/vue";
</script>

<template>
  <div style="display: grid; gap: 0.5rem; inline-size: 100%">
    <Comment author="Sage Wei" datetime="Today, 09:12">
      <template #avatar>
        <Avatar.Root>
          <Avatar.Fallback>SW</Avatar.Fallback>
        </Avatar.Root>
      </template>
      Shall the hairlines run through the annex as well?
    </Comment>
    <div style="padding-inline-start: 2.75rem">
      <Comment author="Archive keeper" datetime="Today, 10:03">
        <template #avatar>
          <Avatar.Root>
            <Avatar.Fallback>AK</Avatar.Fallback>
          </Avatar.Root>
        </template>
        Yes — same rule, same weight, one page everywhere.
      </Comment>
    </div>
  </div>
</template>
