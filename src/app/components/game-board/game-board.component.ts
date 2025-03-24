import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Board} from "../keyboard/keyboard.component";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  @Input() board: Board = [];

  getClass(color: string): string {
    return {
      green: 'bg-green-500 text-white',
      yellow: 'bg-yellow-400 text-white',
      gray: 'bg-gray-400 text-white'
    }[color] || 'border-gray-300';
  }
}