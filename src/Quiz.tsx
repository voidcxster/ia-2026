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
    try {
      setFlashcardText(cardSetRef.current.prevCard())
    } catch (e) {
      // TODO: handle error
      if (e instanceof RangeError) {
        console.log(e.message)
      } else {
        console.error("Unknown error type :(")
      }
    }
  }

  const nextCard: MouseEventHandler = () => {
    try {
      setFlashcardText(cardSetRef.current.nextCard())
    } catch (e) {
      // TODO: handle error
      if (e instanceof RangeError) {
        console.log(e.message)
      } else {
        console.error("Unknown error type :(")
      }
    }
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