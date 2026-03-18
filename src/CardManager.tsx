import { Card } from './Card.tsx';

export default class FlashcardSet {
  private title: string;
  private cards: object;
  private index: number = 0;

  constructor(title: string, cards: object) {
    this.title = title;
    this.cards = cards;
  }

  nextCard(): Card {
    let max: number = 0;//this.cards.max;
    this.index++;
  }

  prevCard(): Card {
    this.index--;
  }
}