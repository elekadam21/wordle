<script setup lang="ts">
import { LetterStatus } from "../types/LetterStatus.interface";
import KeyContainer from "./KeyContainer.vue";

defineProps<{ letters: LetterStatus[]; wrongAnswer: boolean }>();
</script>

<template>
  <div class="game-board-row" :class="{ 'wrong-answer': wrongAnswer }">
    <KeyContainer v-for="(keyStatus, index) in letters" :key="index" :letterStatus="keyStatus" :isBoardLetter="true" />
  </div>
</template>

<style scoped>
.game-board-row {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
}

.wrong-answer {
  animation: horizontal-shaking 0.35s;
}

@keyframes horizontal-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
