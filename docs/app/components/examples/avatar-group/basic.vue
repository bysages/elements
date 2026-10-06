<script setup lang="ts">
import { Avatar, AvatarGroup } from "@bysages/vue";

const people = ["Q", "C", "Z", "T"];
</script>

<template>
  <AvatarGroup>
    <Avatar v-for="person in people" :key="person">
      <Avatar.Fallback>{{ person }}</Avatar.Fallback>
    </Avatar>
  </AvatarGroup>
</template>
