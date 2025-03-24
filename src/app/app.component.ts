import {Component, inject} from '@angular/core';
import {GameBoardComponent} from "./components/game-board/game-board.component";
import {Board, KeyboardComponent} from "./components/keyboard/keyboard.component";
import {StatsPanelComponent} from "./components/stats-panel/stats-panel.component";
import {GameStateService} from "./services/game-state.service";
import {NgForOf, NgIf} from "@angular/common";
import {WordService} from "./services/word.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    GameBoardComponent,
    KeyboardComponent,
    StatsPanelComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
})
export class AppComponent {
  private readonly wordValidatorService = inject(WordService);
  readonly gameStateService = inject(GameStateService);

  wordLength = 5;
  mode: 'classic' | 'timed' | 'practice' = 'classic';
  timer: any;
  timeLeft = 60;
  board: Board = [];
  currentGuess!: string;
  secretWord!: string;
  remaining = 6;
  gameOver = false;
  win = false;
  showMenu = true;

  startGame() {
    this.showMenu = false;
    this.newGame();
  }

  newGame() {
    this.secretWord = this.wordValidatorService.getRandomWord(this.wordLength);
    console.log(this.secretWord)
    this.gameStateService.newGame(this.secretWord, this.mode !== 'practice');
    this.board = [];
    this.currentGuess = '';
    this.remaining = this.gameStateService.maxAttempts;
    this.gameOver = false;
    this.win = false;

    if (this.mode === 'timed') {
      this.timeLeft = 60;
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.gameOver = true;
          this.win = false;
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  }

  createEmptyTiles(): undefined[] {
    return Array(this.wordLength - this.currentGuess.length);
  }

  returnToMenu() {
    this.showMenu = true;
    clearInterval(this.timer);
  }

  onKey(key: string): void {
    if (this.gameOver) return;
    if (key === 'ENTER' && this.wordValidatorService.isValid(this.currentGuess, this.wordLength)) {
      const {feedback, gameOver, win} = this.gameStateService.guess(this.currentGuess.toUpperCase());
      this.board.push(this.currentGuess.toUpperCase().split('').map((char, i) => ({
        char,
        color: feedback[i]
      })));
      this.currentGuess = '';
      this.remaining = this.gameStateService.maxAttempts - this.board.length;
      this.gameOver = gameOver;
      this.win = win;
    } else if (key === 'BACKSPACE') {
      this.currentGuess = this.currentGuess.slice(0, -1)
    } else if (/^[A-Z]$/.test(key) && key.length === 1 && this.currentGuess.length < this.wordLength) {
      this.currentGuess += key;
    }
  }
}