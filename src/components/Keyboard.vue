<script setup lang="ts">
import { LetterStatus } from "../types/LetterStatus.interface";
import KeyboardRow from "./KeyboardRow.vue";

defineProps<{ keys: LetterStatus[][] }>();
const emit = defineEmits(["keyClicked"]);

function handleKeyClick(key: string): void {
  emit("keyClicked", key);
}
</script>

<template>
  <div class="keyboard">
    <KeyboardRow :keys="keys[0]" @key-clicked="handleKeyClick" />
    <KeyboardRow :keys="keys[1]" @key-clicked="handleKeyClick" />
    <KeyboardRow :keys="keys[2]" @key-clicked="handleKeyClick" />
  </div>
</template>

<style scoped></style>
