import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {GameBoardComponent} from './game-board.component';
import {Board} from '../keyboard/keyboard.component';
import {By} from '@angular/platform-browser';

type Host = Pick<GameBoardComponent, 'board'>;

describe('GameBoardComponent', () => {
  let fixture: MockedComponentFixture<GameBoardComponent, Host>;

  const mockBoard: Board = [
    [
      {char: 'P', color: 'green'},
      {char: 'L', color: 'yellow'},
      {char: 'A', color: 'gray'},
      {char: 'N', color: 'gray'},
      {char: 'T', color: 'green'}
    ]
  ];

  beforeEach(async () => {
    await MockBuilder(GameBoardComponent);
    fixture = MockRender(GameBoardComponent, {
      board: mockBoard,
    });
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display all rows and cells from board', () => {
    const rowEls = fixture.debugElement.queryAll(By.css('.flex'));
    expect(rowEls.length).toBe(mockBoard.length);

    const cellEls = rowEls[0].queryAll(By.css('div'));
    expect(cellEls.length).toBe(5);
    expect(cellEls.map(el => el.nativeElement.textContent.trim())).toEqual(['P', 'L', 'A', 'N', 'T']);
  });
});
