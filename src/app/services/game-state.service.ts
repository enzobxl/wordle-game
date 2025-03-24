import {inject, Injectable} from '@angular/core';
import {GameLogicService} from './game-logic.service';

@Injectable({providedIn: 'root'})
export class GameStateService {
  private readonly gameLogic = inject(GameLogicService);

  secret = '';
  attempts: string[] = [];
  maxAttempts = 6;
  stats = {wins: 0, streak: 0, avgAttempts: 0};
  trackStats = true;

  newGame(secretWord: string, trackStats: boolean = true) {
    this.secret = secretWord;
    this.attempts = [];
    this.trackStats = trackStats;
  }

  guess(word: string): { feedback: string[]; gameOver: boolean; win: boolean } {
    const feedback = this.gameLogic.getFeedback(this.secret, word);
    this.attempts.push(word);

    const win = word === this.secret;
    const gameOver = win || this.attempts.length >= this.maxAttempts;

    if (gameOver && this.trackStats) {
      if (win) {
        this.stats.wins++;
        this.stats.streak++;
      } else {
        this.stats.streak = 0;
      }

      if (this.stats.wins > 0) {
        this.stats.avgAttempts = Math.round(
          (this.stats.avgAttempts * (this.stats.wins - 1) + this.attempts.length) / this.stats.wins
        );
      }
    }

    return {feedback, gameOver, win};
  }
}