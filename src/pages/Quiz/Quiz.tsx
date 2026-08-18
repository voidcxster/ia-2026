import styles from "./Quiz.module.css";
import { useEffect, useState, type MouseEventHandler } from "react";
import { useParams } from "react-router";
import { readJSON } from "@utils/IOUtils.ts";
import * as Data from "@models/UserData.ts";

// contains the flash card and flipping functionality
export function Quiz() {
  const {quizID} = useParams<{quizID: string}>();
  // if (!quizID) {
  //   return <div>Not found</div>;
  // }
  // console.log(quizID);

  // const [cardSetsData, setCardSetsData] = useState<Data.CardSets | null>(null);
  const [cardSet, setCardSet] = useState<Data.CardSet | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);


  useEffect(() => {
    let ignore = false;

    (async () => {
      //read JSON
      const obj = await readJSON();
      if (!obj) {
        console.error("Invalid JSON");
        return;
      }

      if (!ignore) {
        const c: Data.CardSets = obj.cardSets;
        // setCardSetsData(c);

        let set: Data.CardSet | undefined;
        if (quizID && Object.hasOwn(c, quizID)) {
          set = c[quizID];
        }

        if (set !== undefined) {
          setCardSet(set);
        }
      }
    })();

    return () => {
      ignore = true;
    }
  }, [quizID])

  if (cardSet === null) return (
    <h1>Error: Card set not found (check your key in the url!)</h1>
  )

  const cardSetLength = cardSet.cards.length;

  function getCardText() {
    if (cardSet)
      return cardSet.cards[cardIndex][flipped ? 1 : 0];
    else
      return "";
  }

  const flipCard: MouseEventHandler = () => {
    setFlipped(!flipped);
  };

  const prevCard: MouseEventHandler = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  const nextCard: MouseEventHandler = () => {
    if (cardIndex < cardSetLength - 1) {
      setCardIndex(cardIndex + 1)
    }
  };

  return (
    <div className={styles.flexWrapper}>
      <h1 className={styles.quizTitle}>Spanish 300</h1>
      <div className="flashcard card" onClick={flipCard}>
        <h1 className={styles.flashcardtitle}>{getCardText()}</h1>
      </div>
      <div>
        <span id="cardCountSpan">{`${cardIndex + 1}/${cardSetLength}`}</span>
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  )
}

export default Quiz
