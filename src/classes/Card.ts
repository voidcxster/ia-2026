export class Card {
  private question: string;
  private answer: string;

  constructor(q: string, a: string) {
    this.question = q;
    this.answer = a;
  }

  getQuestion(): string {
    return this.question;
  }
  
  getAnswer(): string {
    return this.answer;
  }
}

export default Card;
