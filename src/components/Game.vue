<script setup lang="ts">
import { Game } from "../ts/game";
import Message from "./Message.vue";
import GameBoard from "./GameBoard.vue";
import Keyboard from "./Keyboard.vue";
import WinOverlay from "./WinOverlay.vue";

const game = new Game();

function handleKeyClick(key: string): void {
  game.handleKeyClick(key);
}

function resetMessage(): void {
  game.message.value = "";
}

function resetWrongAnswerRowIndex(): void {
  game.wrongAnswerRow.value = -1;
}
</script>

<template>
  <WinOverlay v-if="game.hasPlayerWon.value" />
  <div class="game-container">
    <div class="header">
      <h1>{{ "Wordle" }}</h1>
      <hr />
    </div>
    <Message :message="game.message.value" @messageReset="resetMessage" />
    <GameBoard
      :letters="game.gameBoardLetters.value"
      :wrongAnswerRow="game.wrongAnswerRow.value"
      @wrongAnswerReset="resetWrongAnswerRowIndex"
    />
    <Keyboard @key-clicked="handleKeyClick" :keys="game.keyStatuses.value" />
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.header {
  width: 100%;
}

hr {
  width: 100%;
}

@media only screen and (max-width: 700px) {
  .game-container {
    gap: 0;
  }

  h1 {
    font-size: 30px;
    line-height: 50px;
  }

  hr {
    margin: 0;
  }
}
</style>
