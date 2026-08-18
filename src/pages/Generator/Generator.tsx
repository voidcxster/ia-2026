import { useState } from "react";
import styles from "./Generator.module.css"

// converts css into a json class
export function Generator() {
  const [title, setTitle] = useState("");
  const [csvText, setCsvText] = useState("");
  const [result, setResult] = useState("");
  function convertToJSON() {
    //check if any text was entered
    if (!csvText.trim()) return;
    if (!title.trim()) return;

    let cards: string = "";
    for (const line of csvText.split("\n")) {
      const [q, a] = line.split(",");
      cards += `      ["${q}", "${a}"],`
    }
    const r: string = `
"${crypto.randomUUID()}": {
  "title": "${title}",
  "cards": [
${cards}
  ]
}`;

    setResult(r);
  }
  return (
    <div style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
      <label htmlFor="title" className={styles.generatorLabel}>Title:</label>
      <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className={styles.generatorInput}/>
      <label htmlFor="csv" className={styles.generatorLabel}>Paste CSV:</label>
      <textarea onChange={(e) => setCsvText(e.target.value)} className={styles.generatorTextArea} name="csv" rows={10}></textarea>
      <button onClick={convertToJSON}>Submit</button>

      <pre id="result">{result}</pre>
    </div>
  );
}

export default Generator;
