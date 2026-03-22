import "./Quiz.css"
import "./FlashcardSet.tsx"
import { useRef, useState, type MouseEventHandler } from "react";
import { FlashcardSet } from './FlashcardSet.tsx'
import { Card } from "./Card.tsx"

export function Quiz() {
  const cardSetRef = useRef<FlashcardSet>(
    new FlashcardSet("Test", [
      new Card("What is 1 + 1?", "2"),
      new Card("What is 1 * 1?", "1")
    ])
  );
  const [flashcardText, setFlashcardText] = useState(
    cardSetRef.current.getText()
  );

  const flipCard: MouseEventHandler = () => {
    setFlashcardText(cardSetRef.current.flipCard())
  }
  
  const prevCard: MouseEventHandler = () => {
    setFlashcardText(cardSetRef.current.prevCard())
  }

  const nextCard: MouseEventHandler = () => {
    setFlashcardText(cardSetRef.current.nextCard())
  }

  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card" onClick={flipCard}>
        <h1 id="flashcardTitle">{flashcardText}</h1>
      </div>
      <div>
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  )
}

export default Quiz