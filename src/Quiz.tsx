import "./Quiz.css"
import "./CardManager.tsx"

export function Quiz() {
  // flashcards: FlashcardSet = new FlashcardSet();
  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card">
        <h1 className="flashcardTitle">hacer</h1>
      </div>
    </div>
  )
}

export default Quiz