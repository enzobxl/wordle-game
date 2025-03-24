import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

export type Board = { char: string, color: string }[][]

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Output() key = new EventEmitter<string>();

  keys = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['W', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    this.onKey(key)
  }

  onKey(key: string): void {
    this.key.emit(key)
  }
}