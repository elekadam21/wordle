<script setup lang="ts">
import { watch } from "vue";
import { LetterStatus } from "../types/LetterStatus.interface";
import GameBoardRow from "./GameBoardRow.vue";

const props = defineProps<{ letters: LetterStatus[][]; wrongAnswerRow: number }>();
const emit = defineEmits(["wrongAnswerReset"]);

function isWrongAnswer(index: number): boolean {
  return index === props.wrongAnswerRow;
}

watch(
  () => props.wrongAnswerRow,
  (index) => {
    if (index !== -1) {
      setTimeout(() => {
        emit("wrongAnswerReset");
      }, 500);
    }
  }
);
</script>

<template>
  <div class="game-board">
    <GameBoardRow
      v-for="(rowLetters, index) in letters"
      :key="index"
      :letters="rowLetters"
      :wrongAnswer="isWrongAnswer(index)"
    />
  </div>
</template>

<style scoped>
.game-board {
  margin-bottom: 24px;
}
</style>
