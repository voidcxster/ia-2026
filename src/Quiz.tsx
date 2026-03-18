import "./Quiz.css"
import "./CardManager.tsx"

export function Quiz() {
  function flipCard(e: PointerEvent) {
    e.target.innerHTML = 
  }

  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card">
        <h1 className="flashcardTitle" onClick={flipCard}>hacer</h1>
      </div>
    </div>
  )
}

export default Quiz