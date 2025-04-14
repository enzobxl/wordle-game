import {ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockBuilder, MockRender} from 'ng-mocks';
import {GameStateService} from './services/game-state.service';
import {WordService} from './services/word.service';
import {FormsModule} from '@angular/forms';
import {GameBoardComponent} from './components/game-board/game-board.component';
import {KeyboardComponent} from './components/keyboard/keyboard.component';
import {StatsPanelComponent} from './components/stats-panel/stats-panel.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockWordService: jasmine.SpyObj<WordService>;
  let mockGameStateService: jasmine.SpyObj<GameStateService>;

  beforeEach(async () => {
    mockWordService = jasmine.createSpyObj('WordService', ['getRandomWord', 'isValid']);
    mockGameStateService = jasmine.createSpyObj('GameStateService', ['newGame', 'guess'], {
      maxAttempts: 6,
      stats: {wins: 0, streak: 0, avgAttempts: 0}
    });

    await MockBuilder(AppComponent)
      .mock(GameBoardComponent)
      .mock(KeyboardComponent)
      .mock(StatsPanelComponent)
      .keep(FormsModule)
      .provide({provide: WordService, useValue: mockWordService})
      .provide({provide: GameStateService, useValue: mockGameStateService});

    fixture = MockRender(AppComponent);
    component = fixture.componentInstance;
  });

  it('should show the menu at startup', () => {
    expect(component.showMenu).toBeTrue();
  });

  it('should start a game and hide the menu', () => {
    mockWordService.getRandomWord.and.returnValue('PLANTE');
    component.startGame();
    expect(component.showMenu).toBeFalse();
    expect(mockWordService.getRandomWord).toHaveBeenCalledWith(5);
    expect(mockGameStateService.newGame).toHaveBeenCalledWith('PLANTE', true);
  });

  it('should ignore key input if game is over', () => {
    component.gameOver = true;
    component.currentGuess = 'TEST';
    component.onKey('A');
    expect(component.currentGuess).toBe('TEST');
  });

  it('should handle BACKSPACE', () => {
    component.currentGuess = 'TEST';
    component.onKey('BACKSPACE');
    expect(component.currentGuess).toBe('TES');
  });

  it('should add a letter when a valid key is pressed', () => {
    component.wordLength = 5;
    component.currentGuess = 'TES';
    component.onKey('T');
    expect(component.currentGuess).toBe('TEST');
  });

  it('should submit a valid guess on ENTER', () => {
    const feedback = ['green', 'gray', 'gray', 'gray', 'gray'];
    mockWordService.isValid.and.returnValue(true);
    mockGameStateService.guess.and.returnValue({feedback, gameOver: true, win: true});
    component.currentGuess = 'PLANT';
    component.wordLength = 5;

    component.onKey('ENTER');

    expect(mockGameStateService.guess).toHaveBeenCalledWith('PLANT');
    expect(component.board.length).toBe(1);
    expect(component.currentGuess).toBe('');
    expect(component.gameOver).toBeTrue();
    expect(component.win).toBeTrue();
  });

  describe('createEmptyTiles', () => {
    it('should return the correct amount empty tiles', () => {
      component.wordLength = 5;
      component.currentGuess = 'abc';
      expect(component.createEmptyTiles().length).toBe(2);

      component.wordLength = 6;
      component.currentGuess = 'abcd';
      expect(component.createEmptyTiles().length).toBe(2);

      component.wordLength = 7;
      component.currentGuess = '';
      expect(component.createEmptyTiles().length).toBe(7);
    });

    it('should return an empty array if guess is complete', () => {
      component.wordLength = 4;
      component.currentGuess = 'test';
      expect(component.createEmptyTiles().length).toBe(0);
    });
  });

  describe('returnToMenu', () => {
    it('should only set showMenu to true', () => {
      component.showMenu = false;
      component.returnToMenu();
      expect(component.showMenu).toBeTrue();
    });
  });

  describe('timed mode', () => {
    it('should start a 60-second timer and end the game when time runs out', fakeAsync(() => {
      component.mode = 'timed';
      component.startGame();

      expect(component.timeLeft).toBe(60);

      tick(59000);
      expect(component.timeLeft).toBe(1);
      expect(component.gameOver).toBeFalse();

      tick(1000);
      expect(component.timeLeft).toBe(0);
      expect(component.gameOver).toBeTrue();
      expect(component.win).toBeFalse();
    }));
  });

});
