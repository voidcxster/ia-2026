import { Card } from "./Card.tsx"
import "./FileManager.css"

export function FileManager() {
  // const [count, setCount] = useState(0)
  const cards: string[] = ["Spanish 300", "Chemistry", "History HL"]

  return (
    <div className="gridWrapper">
      {
        cards.map(n => (
          <Card name={n} link={"/quiz"}/>
        ))
      }
    </div>
  )
}

export default FileManager
