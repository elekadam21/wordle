import { LetterStatus } from "../types/LetterStatus.interface";
import { Status } from "../types/Status.enum";

const keys: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

export function getKeysWithStatuses(): LetterStatus[][] {
  return keys.map((keyRow) => keyRow.map((key) => ({ letter: key, status: Status.UNCHECKED })));
}
