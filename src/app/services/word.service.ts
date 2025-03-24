import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class WordService {
  validWords: Set<string> = new Set([
    'AMATEUR',
    'AMENER',
    'ANCIENS',
    'APPART',
    'AVION',
    'BALAYER',
    'BEURRE',
    'BLEUE',
    'BONNE',
    'CHALET',
    'CHANT',
    'CHIEN',
    'CHIFFON',
    'CLOSER',
    'CRANE',
    'CRAYON',
    'DESSINE',
    'DOIGTS',
    'DOUTEUR',
    'ENFANT',
    'ESPACE',
    'EXISTER',
    'FLEUR',
    'FRIGOLO',
    'GRAND',
    'GRIMACE',
    'GROGNON',
    'JARDIN',
    'JOURNAL',
    'LAMPEUR',
    'LENTEUR',
    'LIVRE',
    'MAISON',
    'MAITRE',
    'MATINAL',
    'MATINE',
    'MATINS',
    'MONSTRE',
    'MONTER',
    'NOIRE',
    'PARDON',
    'PETIT',
    'PLAGE',
    'PLANTE',
    'PLATEAU',
    'POMME',
    'RAISON',
    'REVOLTE',
    'RIVIE',
    'ROUGE',
    'SOEUR',
    'SOLEIL',
    'SOUHAIT',
    'TABLE',
    'TUNNEL',
    'VACHE',
    'VILLAGE',
    'VITES',
    'VOYAGE',
    'VOYAGER',
  ]);

  getRandomWord(length: number): string {
    const filtered = Array.from(this.validWords).filter(w => w.length === Number(length));
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  isValid(word: string, expectedLength: number): boolean {
    const formatted = word.toUpperCase();
    return (
      new RegExp(`^[A-Z]{${expectedLength}}$`).test(formatted)
    );
  }
}
