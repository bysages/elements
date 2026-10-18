<script setup lang="ts">
import { Avatar, AvatarGroup } from "@bysages/vue";

const people = ["Quill May", "Cara Lin", "Zed Wolf", "Tess Rue"];
</script>

<template>
  <AvatarGroup>
    <Avatar v-for="person in people" :key="person" :name="person" />
  </AvatarGroup>
</template>
