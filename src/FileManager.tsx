import { Card } from "./ContentCard.tsx"
import "./FileManager.css"

export function FileManager() {
  // const [count, setCount] = useState(0)
  const cards: string[] = ["Spanish 300", "Chemistry", "History HL", "Calculus 3/4", "Physics", "Computer Science", "Orchestra"]
  // const cards: string[] = ["Spanish 300", "Chemistry"];

  function moveFile() {
    
  }

  return (
    <>
      <div id="fileTree">
        <li>
          {
            cards.map((n, i) => (
              <ol
              className="fileTreeLeaf"
              key={i}
              onClick={() => moveFile(/*url*/)}>
                {n}
              </ol>
            ))
          }
        </li>
      </div>
      <div className="gridWrapper">
        {
          cards.map((n, i) => (
            <Card name={n} link={"/quiz"} key={i.toString()}/>
          ))
        }
      </div>
    </>
  )
}

export default FileManager
