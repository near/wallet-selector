<script setup lang="ts">
import { Message } from "../interfaces";

defineProps<{
  messages: Array<Message>;
}>()
</script>

<template>
  <h2>Messages</h2>
  <!-- format as cards, add timestamp -->
  <p v-for="message in messages" class="{{ message.premium ? 'is-premium' : '' }}">
    <strong>{{ message.sender }}</strong>:<br />
    {{ message.text }}
  </p>
</template>