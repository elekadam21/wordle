import { getLetterStatuses, getRandomWord, checkIfWordIsInWordList } from "./words";
import { getKeysWithStatuses } from "./keys";
import { LetterStatus } from "../types/LetterStatus.interface";
import { Ref, ref } from "vue";
import { Status } from "../types/Status.enum";

const ATTEMPT_COUNT = 6;
const LETTER_COUNT = 5;

export class Game {
  public keyStatuses: Ref<LetterStatus[][]>;
  public gameBoardLetters: Ref<LetterStatus[][]>;
  public message: Ref<string>;
  public wrongAnswerRow: Ref<number>;
  public hasPlayerWon: Ref<boolean>;

  private solution: string;
  private word: string;
  private activeRowIndex: number;
  private boardIsActive: boolean;

  constructor() {
    this.keyStatuses = ref(getKeysWithStatuses());
    this.gameBoardLetters = ref(this.initEmptyLetters());
    this.message = ref("");
    this.wrongAnswerRow = ref(-1);
    this.hasPlayerWon = ref(false);

    this.solution = getRandomWord();
    // console.log(this.solution);
    this.word = "";
    this.activeRowIndex = 0;
    this.boardIsActive = true;
  }

  public handleKeyClick(key: string): void {
    if (this.boardIsActive) {
      if (key === "enter") {
        this.handleEnter();
      } else if (key === "backspace") {
        this.handleBackspace();
      } else {
        this.handleLetterKeys(key);
      }
    }
  }

  private handleEnter(): void {
    if (this.word.length !== LETTER_COUNT) return;

    if (!checkIfWordIsInWordList(this.word)) {
      this.message.value = "Word is not in the word list!";
      this.wrongAnswerRow.value = this.activeRowIndex;
      return;
    }

    const letterStatuses = getLetterStatuses(this.word, this.solution);
    this.updateKeyboard(letterStatuses);
    this.updateGameBoard(letterStatuses);

    if (this.checkForWin(letterStatuses)) return;

    this.handleTurns();
  }

  private handleBackspace(): void {
    this.word = this.word.slice(0, -1);
    this.gameBoardLetters.value[this.activeRowIndex][this.word.length] = { letter: " ", status: Status.UNCHECKED };
  }

  private handleLetterKeys(key: string) {
    if (this.word.length < LETTER_COUNT) {
      this.word += key;
      this.gameBoardLetters.value[this.activeRowIndex][this.word.length - 1] = {
        letter: key,
        status: Status.UNCHECKED,
      };
    }
  }

  private initEmptyLetters(): LetterStatus[][] {
    return Array.from({ length: ATTEMPT_COUNT }, () =>
      Array.from({ length: LETTER_COUNT }, () => ({ letter: " ", status: Status.UNCHECKED }))
    );
  }

  private updateKeyboard(letterStatuses: LetterStatus[]): void {
    letterStatuses.forEach((updatedLetter) => {
      for (const row of this.keyStatuses.value) {
        const keyIndex = row.findIndex((key) => key.letter === updatedLetter.letter);
        if (keyIndex !== -1) {
          this.updateKeyboardRow(row, keyIndex, updatedLetter);
          break;
        }
      }
    });
  }

  private updateKeyboardRow(row: LetterStatus[], keyIndex: number, updatedLetter: LetterStatus): void {
    const oldStatus = row[keyIndex].status;
    const newStatus = updatedLetter.status;
    const uncheckedToChecked = oldStatus === Status.UNCHECKED;
    const presentToCorrect = oldStatus === Status.PRESENT && newStatus === Status.CORRECT;

    if (uncheckedToChecked || presentToCorrect) {
      row[keyIndex] = updatedLetter;
    }
  }

  private updateGameBoard(letterStatuses: LetterStatus[]) {
    this.gameBoardLetters.value[this.activeRowIndex] = letterStatuses;
  }

  private checkForWin(letterStatuses: LetterStatus[]): boolean {
    const correctCount = letterStatuses.reduce((acc, letter) => (letter.status === Status.CORRECT ? acc + 1 : acc), 0);

    if (correctCount === LETTER_COUNT) {
      this.message.value = "You've won!";
      this.boardIsActive = false;
      this.hasPlayerWon.value = true;
      return true;
    }

    return false;
  }

  private checkForEnd(): boolean {
    return this.activeRowIndex === ATTEMPT_COUNT - 1;
  }

  private handleTurns(): void {
    if (!this.checkForEnd()) {
      this.activeRowIndex++;
      this.word = "";
    } else {
      this.message.value = "You've lost! Your word was: " + this.solution;
      this.boardIsActive = false;
    }
  }
}
