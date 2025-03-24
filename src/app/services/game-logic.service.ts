import {Injectable} from '@angular/core';

export type Feedback = ('green' | 'yellow' | 'gray')[];

@Injectable({providedIn: 'root'})
export class GameLogicService {
  getFeedback(secret: string, guess: string): Feedback {
    const length = secret.length;
    const feedback: Feedback = Array(length).fill('gray');
    const secretArr = secret.split('');
    const guessArr = guess.split('');

    for (let i = 0; i < length; i++) {
      if (guessArr[i] === secretArr[i]) {
        feedback[i] = 'green';
        secretArr[i] = '_';
        guessArr[i] = '-';
      }
    }

    for (let i = 0; i < length; i++) {
      const index = secretArr.indexOf(guessArr[i]);
      if (feedback[i] === 'gray' && index !== -1) {
        feedback[i] = 'yellow';
        secretArr[index] = '_';
      }
    }

    return feedback;
  }
}