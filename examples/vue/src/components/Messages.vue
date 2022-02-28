<script setup lang="ts">
const props = defineProps<{
  messages: Array<{
    premium: boolean;
    sender: string;
    text: string;
  }>;
}>()

console.log(props.messages);
</script>

<template>
  <h2>Messages</h2>
  <!-- format as cards, add timestamp -->
  <p v-for="message in messages" class="{{ message.premium ? 'is-premium' : '' }}">
    <strong>{message.sender}</strong>:<br />
    {message.text}
  </p>
</template>