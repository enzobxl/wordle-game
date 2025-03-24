import {WordService} from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    service = new WordService();
  });

  describe('isValid()', () => {
    it('should return true for a valid word of expected length', () => {
      expect(service.isValid('PLAGE', 5)).toBeTrue();
      expect(service.isValid('MAISON', 6)).toBeTrue();
    });

    it('should return false for a word with wrong length', () => {
      expect(service.isValid('CHAT', 5)).toBeFalse();  // only 4 letters
      expect(service.isValid('ANCIENS', 6)).toBeFalse(); // 7 letters
    });

    it('should return false for a word with non-alphabetic characters', () => {
      expect(service.isValid('BONN3', 5)).toBeFalse();
      expect(service.isValid('PL@GE', 5)).toBeFalse();
    });

    it('should be case-insensitive', () => {
      expect(service.isValid('plage', 5)).toBeTrue();
      expect(service.isValid('MaIsOn', 6)).toBeTrue();
    });
  });

  describe('getRandomWord()', () => {
    it('should return a word of the given length', () => {
      const word5 = service.getRandomWord(5);
      const word6 = service.getRandomWord(6);
      const word7 = service.getRandomWord(7);

      expect(word5.length).toBe(5);
      expect(word6.length).toBe(6);
      expect(word7.length).toBe(7);
    });

    it('should return a word that exists in validWords', () => {
      const word = service.getRandomWord(6);
      expect(service.validWords.has(word)).toBeTrue();
    });

    it('should return undefined if no word of that length exists', () => {
      const result = service.getRandomWord(20);
      expect(result).toBeUndefined();
    });
  });
});
