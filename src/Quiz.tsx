import "./Quiz.css"
import "./FlashcardSet.tsx"
import type { MouseEventHandler } from "react";
import { FlashcardSet } from './FlashcardSet.tsx'
import { Card } from "./Card.tsx"

export function Quiz() {
  const flashCardTitle = document.getElementById("flashcardTitle");
  const cardSet: FlashcardSet = new FlashcardSet("Test", [
    new Card("What is 1 + 1?", "2"),
    new Card("What is 1 * 1?", "1")
  ]);
  const flipCard: MouseEventHandler = () => {
    // console.log(flashCardTitle);
    if (flashCardTitle == null) {
      return
    }
    flashCardTitle.innerHTML = cardSet.flipCard()
  }
    // flashCardTitle = 
    // let flashCardTitle = document.getElementById("flashcardTitle");
  // function flipCard(e: MouseEvent) {
    // let flashCardTitle = document.getElementById("flashcardTitle");
    // flashCardTitle = 
  // }

  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card" onClick={flipCard}>
        <h1 id="flashcardTitle">{cardSet.getText()}</h1>
      </div>
      <div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  )
}

export default Quiz