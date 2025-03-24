import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-stats-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-panel.component.html',
  styleUrl: './stats-panel.component.scss'
})
export class StatsPanelComponent {
  @Input() stats = {wins: 0, streak: 0, avgAttempts: 0};
}