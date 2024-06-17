import wordsJson from "../assets/all_words_with_five_letters_for_wordle.json";
import wordleWords from "../assets/wordle_words.json";
import { LetterStatus } from "../types/LetterStatus.interface";
import { Status } from "../types/Status.enum";

export const allPossibleWords: string[] = Object.keys(wordsJson);
export const words: string[] = wordleWords;

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function checkIfWordIsInWordList(word: string): boolean {
  return allPossibleWords.includes(word);
}

export function getLetterStatuses(word: string, solution: string): LetterStatus[] {
  const lettersOfWord: string[] = word.split("");
  let letterStatuses: LetterStatus[] = [];

  for (let letterIndex = 0; letterIndex < lettersOfWord.length; letterIndex++) {
    const letterStatus = getLetterStatus(lettersOfWord, letterIndex, solution);
    solution = modifySolution(letterStatus, solution, letterIndex);
    letterStatuses.push(letterStatus);
  }

  return letterStatuses;
}

function getLetterStatus(lettersOfWord: string[], index: number, solution: string): LetterStatus {
  const letter = lettersOfWord[index];
  const isLetterCorrect = solution[index] === letter;
  const isLetterPresent = checkIfLetterIsPresent(lettersOfWord, letter, solution);

  if (isLetterCorrect) return { letter, status: Status.CORRECT };
  if (isLetterPresent) return { letter, status: Status.PRESENT };

  return { letter, status: Status.ABSENT };
}

function modifySolution(letterStatus: LetterStatus, solution: string, letterIndex: number): string {
  if (letterStatus.status === Status.CORRECT) return replaceLetterAtIndex(solution, letterIndex);

  if (letterStatus.status === Status.PRESENT) {
    const indexOfPresentLetter = solution.indexOf(letterStatus.letter);
    return replaceLetterAtIndex(solution, indexOfPresentLetter);
  }

  return solution;
}

function replaceLetterAtIndex(solution: string, i: number): string {
  return solution.slice(0, i) + "_" + solution.slice(i + 1);
}

function checkIfLetterIsPresent(lettersOfWord: string[], letter: string, solution: string): boolean {
  if (solution.includes(letter)) {
    const indexOfLetterInSolution = solution.split("").findIndex((solutionLetter) => letter === solutionLetter);
    const letterAtIndexIsNotCorrect = lettersOfWord[indexOfLetterInSolution] !== letter;

    if (letterAtIndexIsNotCorrect) return true;
  }

  return false;
}
