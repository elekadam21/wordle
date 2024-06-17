<script setup lang="ts">
import { LetterStatus } from "../types/LetterStatus.interface";

const props = defineProps<{ letterStatus: LetterStatus; isBoardLetter: boolean }>();
const emit = defineEmits(["keyClicked"]);

const isSpecialKey = props.letterStatus.letter.length > 1;

function handleKeyClick(key: string): void {
  emit("keyClicked", key);
}
</script>

<template>
  <div
    class="container"
    @click="handleKeyClick(letterStatus.letter)"
    :class="[
      isBoardLetter ? 'board-letter-container' : 'key-container',
      letterStatus.status,
      { 'special-key': isSpecialKey },
    ]"
    @mousedown.prevent=""
  >
    <span>{{ letterStatus.letter }}</span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  margin: 0 6px 0 0;
  height: 58px;
  min-width: 24px;
  padding: 0 15px;
  border-radius: 4px;
  background-color: var(--key-bg);
  color: var(--key-text-color);
  text-transform: uppercase;
}

.board-letter-container {
  border: 2px solid #3a3a3c;
  background-color: #121212;
  box-sizing: border-box;
  font-size: 2em;
  border-radius: 0;
  height: 62px;
  width: 62px;
  padding: 0;
}

.key-container {
  user-select: none;
}

.key-container:active {
  transform: scale(0.98);
}

.present {
  background-color: var(--key-bg-present);
}

.correct {
  background-color: var(--key-bg-correct);
}

.absent {
  background-color: var(--key-bg-absent);
}

@media only screen and (max-width: 700px) {
  .container {
    height: 50px;
    padding: 0 3px;
  }

  .board-letter-container {
    height: 52px;
    width: 52px;
  }

  .special-key {
    font-size: 10px;
  }
}
</style>
