import "./Quiz.css"
import "./CardManager.tsx"

export function Quiz() {
  function flipCard(e: PointerEvent) {
    let flashCardTitle: HTMLDivElement = document.getElementById("flashcardTitle");
  }

  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card">
        <h1 id="flashcardTitle" onClick={flipCard}>hacer</h1>
      </div>
    </div>
  )
}

export default Quiz