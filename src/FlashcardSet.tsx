import { Card } from './Card.tsx';

export class FlashcardSet {
  private title: string;
  private cards: Card[];
  private index: number = 0;
  private flippedToAns: boolean = false;

  constructor(title: string, cards: Card[]) {
    this.title = title;
    this.cards = cards;
  }

  flipCard(): string {
    if (this.flippedToAns) {
      this.flippedToAns = !this.flippedToAns;
      return this.getCard().getQuestion()
    } else {
      this.flippedToAns = !this.flippedToAns;
      return this.getCard().getAnswer()
    }
  }

  nextCard(): string {
    let len: number = this.cards.length;
    //check if there are any cards are left
    if (this.index + 1 >= len) {
      throw new RangeError("No more cards are left. You've reached the end.")
    }

    this.index++;
    return this.getCard().getQuestion();
  }

  prevCard(): string {
    //check if there are any cards are left
    if (this.index <= 0) {
      throw new RangeError("No more cards are left. You've reached the beginning.")
    }

    this.index--;
    return this.getCard().getQuestion();
  }

  private getCard(): Card {
    return this.cards[this.index];
  }

  getTitle(): string {
    return this.title;
  }

  getText(): string {
    if (this.flippedToAns) {
      return this.getCard().getAnswer()
    } else {
      return this.getCard().getQuestion()
    }
  }
}