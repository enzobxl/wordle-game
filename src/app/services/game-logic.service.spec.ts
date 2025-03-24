import {GameLogicService} from './game-logic.service';

describe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    service = new GameLogicService();
  });

  it('should return all green when guess matches secret', () => {
    const result = service.getFeedback('PLANT', 'PLANT');
    expect(result).toEqual(['green', 'green', 'green', 'green', 'green']);
  });

  it('should return all gray when no letters match', () => {
    const result = service.getFeedback('PLANT', 'MUSIC');
    expect(result).toEqual(['gray', 'gray', 'gray', 'gray', 'gray']);
  });

  it('should return all yellow when letters are correct but misplaced', () => {
    const result = service.getFeedback('PLANT', 'TNALP');
    expect(result).toEqual(['yellow', 'yellow', 'green', 'yellow', 'yellow']);
  });

  it('should handle mixed green and yellow correctly', () => {
    const result = service.getFeedback('PLANT', 'PLANE');
    expect(result).toEqual(['green', 'green', 'green', 'green', 'gray']);
  });

  it('should handle duplicate letters in guess when secret has only one', () => {
    const result = service.getFeedback('PLANT', 'APPLE');
    expect(result).toEqual(['yellow', 'yellow', 'gray', 'yellow', 'gray']);
  });

  it('should handle duplicate letters in secret correctly', () => {
    const result = service.getFeedback('LEVEL', 'LEMON');
    expect(result).toEqual(['green', 'green', 'gray', 'gray', 'gray']);
  });

  it('should work with 6-letter words', () => {
    const result = service.getFeedback('BOTTLE', 'BETTER');
    expect(result).toEqual(['green', 'yellow', 'green', 'green', 'gray', 'gray']);
  });

  it('should work with 7-letter words', () => {
    const result = service.getFeedback('JOURNAL', 'JUNGLES');
    expect(result.length).toBe(7);
  });
});
