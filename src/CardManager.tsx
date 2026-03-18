import { Card } from './Card.tsx';

export default class FlashcardSet {
  private title: string;
  private cards: Card[];
  private index: number = 0;

  constructor(title: string, cards: Card[]) {
    this.title = title;
    this.cards = cards;
  }

  nextCard(): Card {
    let len: number = this.cards.length;
    //check if there are any cards are left
    if (this.index + 1 >= len) {
      throw new RangeError("No more cards are left. You've reached the end.")
    }

    this.index++;
    return this.getCard();
  }

  prevCard(): Card {
    let len: number = this.cards.length;
    //check if there are any cards are left
    if (this.index <= 0) {
      throw new RangeError("No more cards are left. You've reached the beginning.")
    }

    this.index--;
    return this.getCard();
  }

  private getCard(): Card {
    return this.cards[this.index];
  }

  getTitle(): string {
    return this.title;
  }
}