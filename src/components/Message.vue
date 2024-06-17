<script setup lang="ts">
import { watch } from "vue";

const props = defineProps<{ message: string }>();
const emit = defineEmits(["messageReset"]);

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage.length) {
      setTimeout(() => {
        emit("messageReset");
      }, 3000);
    }
  }
);
</script>

<template>
  <div class="message-container" :class="{ active: message.length }">
    {{ message }}
  </div>
</template>

<style scoped>
.message-container {
  height: 50px;
  width: 280px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  transition: background-color 0.3s linear;
}

.active {
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>
