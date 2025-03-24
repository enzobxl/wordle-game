import {TestBed} from '@angular/core/testing';
import {GameStateService} from './game-state.service';
import {GameLogicService} from './game-logic.service';

describe('GameStateService', () => {
  let service: GameStateService;
  let mockGameLogicService: jasmine.SpyObj<GameLogicService>;

  beforeEach(() => {
    mockGameLogicService = jasmine.createSpyObj('GameLogicService', ['getFeedback']);

    TestBed.configureTestingModule({
      providers: [
        GameStateService,
        {provide: GameLogicService, useValue: mockGameLogicService}
      ]
    });

    service = TestBed.inject(GameStateService);
  });

  it('should initialize with default values', () => {
    expect(service.secret).toBe('');
    expect(service.attempts).toEqual([]);
    expect(service.maxAttempts).toBe(6);
    expect(service.stats).toEqual({wins: 0, streak: 0, avgAttempts: 0});
  });

  it('should reset state on newGame()', () => {
    service.secret = 'TEST';
    service.attempts = ['ABC'];
    service.stats.wins = 1;

    service.newGame('PLANT', false);

    expect(service.secret).toBe('PLANT');
    expect(service.attempts).toEqual([]);
    expect(service.trackStats).toBeFalse();
  });

  it('should return correct guess result when word matches secret', () => {
    service.newGame('PLANT');
    mockGameLogicService.getFeedback.and.returnValue(['green', 'green', 'green', 'green', 'green']);

    const result = service.guess('PLANT');

    expect(result.win).toBeTrue();
    expect(result.gameOver).toBeTrue();
    expect(service.attempts).toEqual(['PLANT']);
    expect(service.stats.wins).toBe(1);
    expect(service.stats.streak).toBe(1);
    expect(service.stats.avgAttempts).toBe(1);
  });

  it('should end game after max attempts and not win', () => {
    service.newGame('PLANT');
    service.attempts = ['GUESS1', 'GUESS2', 'GUESS3', 'GUESS4', 'GUESS5'];
    mockGameLogicService.getFeedback.and.returnValue(['gray', 'gray', 'gray', 'gray', 'gray']);

    const result = service.guess('GUESS6');

    expect(result.win).toBeFalse();
    expect(result.gameOver).toBeTrue();
    expect(service.stats.wins).toBe(0); // no win, no avgAttempts change
    expect(service.stats.streak).toBe(0);
  });

  it('should not track stats if trackStats is false', () => {
    service.newGame('PLANT', false);
    mockGameLogicService.getFeedback.and.returnValue(['green', 'green', 'green', 'green', 'green']);

    const result = service.guess('PLANT');

    expect(result.win).toBeTrue();
    expect(service.stats.wins).toBe(0); // tracking disabled
    expect(service.stats.avgAttempts).toBe(0);
  });

  it('should calculate avgAttempts correctly over multiple wins', () => {
    service.stats.wins = 2;
    service.stats.avgAttempts = 4; // previous average

    service.newGame('LIGHT');
    service.attempts = ['AAA', 'BBB', 'CCC'];
    mockGameLogicService.getFeedback.and.returnValue(['green', 'green', 'green', 'green', 'green']);

    const result = service.guess('LIGHT');

    // (4*2 + 3) / 3 = 11/3 = 3.666... -> 4
    expect(service.stats.avgAttempts).toBe(4);
  });
});
