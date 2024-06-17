<script setup lang="ts">
import { LetterStatus } from "../types/LetterStatus.interface";
import KeyContainer from "./KeyContainer.vue";

defineProps<{ keys: LetterStatus[] }>();
const emit = defineEmits(["keyClicked"]);

function handleKeyClick(key: string): void {
  emit("keyClicked", key);
}
</script>

<template>
  <div class="keyboard-row">
    <div v-for="(key, index) in keys" :key="index" class="keyboard-key">
      <KeyContainer :letterStatus="key" :isBoardLetter="false" @key-clicked="handleKeyClick" />
    </div>
  </div>
</template>

<style scoped>
.keyboard-row {
  display: flex;
  justify-content: center;
  margin: 6px 0;
}

.keyboard-key {
  cursor: pointer;
}
</style>
