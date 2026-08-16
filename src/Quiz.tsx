import "./Quiz.css"
import "./FlashcardSet.tsx"
import { useEffect, useState, type MouseEventHandler } from "react";
import { FlashcardSet } from './FlashcardSet.tsx'
import { useParams } from "react-router";
import { readJSON, readCardSets } from "./FileManager.tsx"
import * as Data from "./UserData.tsx"

// contains the flash card and flipping functionality
export function Quiz() {
  const {quizID} = useParams<{quizID: string}>();
  if (!quizID) {
    return <div>Not found</div>;
  }
  console.log(quizID);

  const [cardSetsData, setCardSetsData] = useState<Data.CardSetsData | null>(null);
  const [flashcardText, setFlashcardText] = useState("");

  const [cardSet, setCardSet] = useState<FlashcardSet | null>(null);
  useEffect(() => {
    (async () => {
      //read JSON
      const obj = await readJSON();
      if (!obj) {
        console.error("Invalid JSON");
        return;
      }

      const c: Data.CardSetsData = readCardSets(obj);
      setCardSetsData(c);

      const set = c.get(quizID);
      if (!set) return;

      setCardSet(set);
      setFlashcardText(set.getText());
      setCardLength(set.getLength())
    })();
  }, [quizID])

  const [cardIndex, setCardIndex] = useState(1);
  const [cardLength, setCardLength] = useState(0);


  const flipCard: MouseEventHandler = () => {
    if (!cardSet) return;
    setFlashcardText(cardSet.flipCard());
  };

  const prevCard: MouseEventHandler = () => {
    if (!cardSet) return;
    try {
      setFlashcardText(cardSet.prevCard());
    } catch (e) {
      if (e instanceof RangeError) console.log(e.message);
      else console.log("Unknown Error type")
    }
  };

  const nextCard: MouseEventHandler = () => {
    if (!cardSet) return;
    try {
      setFlashcardText(cardSet.nextCard());
    } catch (e) {
      if (e instanceof RangeError) console.log(e.message);
      else console.log("Unknown Error type")
    }
  };

  return (
    <div className="flexWrapper">
      <h1 className="quizTitle">Spanish 300</h1>
      <div className="flashcard card" onClick={flipCard}>
        <h1 id="flashcardTitle">{flashcardText}</h1>
      </div>
      <div>
        <span id="cardCountSpan">{`${cardIndex}/${cardLength}`}</span>
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  )
}

export default Quiz
