import { useEffect, useRef, useState, type ChangeEventHandler } from "react";
import { FlashcardSet } from "./FlashcardSet.tsx"
import { Card } from "./Card.tsx"
import { FileLeaf } from "./FileLeaf.tsx";
import { ContentCard } from "./ContentCard.tsx"
import "./FileManager.css"
import * as Data from "./UserData.tsx"
import { Link } from "react-router";

// allows the user to view the folder structure and card sets
export function FileManager() {
  const cards: string[] = ["Spanish 300", "Chemistry", "History HL", "Calculus 3/4", "Physics", "Computer Science", "Orchestra"]

  let [settingsData, setSettingsData] = useState<Data.SettingsData | null>(null);
  let [folderData, setFolderData] = useState<Data.FolderData | null>(null);
  let [cardSetsData, setCardSetsData] = useState<Data.CardSetsData | null>(null);
  let [currentFolder, setCurrentFolder] = useState<Data.Content[] | null>(null);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      const obj = await readJSON();
      if (!obj) {
        console.error("Invalid JSON");
        return;
      }
      const [s, f, c] = convertJSONtoObj(obj);
      console.log(s)
      console.log(f)
      console.log(c);

      setSettingsData(s);
      setFolderData(f);
      setCardSetsData(c);
      // console.log(folderData);
      setCurrentFolder(f.getFolders())
      // console.log(currentFolder);
    })();
  }, [])

  // const initializeSettings: ChangeEventHandler = async () => {
  //   const fileInput: HTMLInputElement = fileInputRef.current!;
  //   const selectedFile = fileInput.files![0];
  //   [settingsData, folderData, cardSetsData] = await readJSON(selectedFile);
  // }

  function changeDirectory(folder: Data.Content[]) {
    setCurrentFolder(folder);
  }

  return (
    <>
      <div id="fileTree">
        <ol>
          <li className="fileTreeLeaf">
            <span onClick={() => setCurrentFolder(folderData && folderData.getFolders())}>Home</span>
            <ol style={{paddingLeft:"20px"}}>
              {
                folderData && folderData.getFolders().map((content, i) => {
                  if (content instanceof Data.Folder) {
                    return <FileLeaf key={i} item={content} onClick={(folder: Data.Content[]) => setCurrentFolder(folder)} />;
                  }
                  // <li
                  // className="fileTreeLeaf"
                  // key={i}
                  // onClick={() => changeDirectory(/*url*/)}>
                  //   {
                  //     content.getTitle()
                  //     // Object.hasOwn(content, "title") ?
                  //     // (content as Data.Folder).getTitle() :
                  //     // cardSetsData?.get((content as CardSetLink).getKey().getTitle())
                  //   }
                  // </li>
                })
              }
            </ol>
          </li>
        </ol>
        <Link to="/generator" id="addCardsLink">Add Cards</Link>
        {/* <div id="settingsDiv">
          <label id="settingsLabel" htmlFor="settings">Choose a settings file.</label>
          <input type="file" name="settings" id="settings" onChange={initializeSettings} ref={fileInputRef}/>
        </div> */}
      </div>
      <div className="gridWrapper">
        {
          currentFolder && currentFolder.map((content, i) => {
            if (content instanceof Data.Folder) {
              return (<ContentCard name={content.getTitle()} onClick={() => changeDirectory(content.getContents())} key={i.toString()}/>);
            } else if (content instanceof Data.CardSetLink) {
              return (<ContentCard name={content.getTitle()} link={`/quiz/${content.getKey()}`} key={i.toString()}/>);
            } else {
              console.error("Something bad.")
            }
          })
        }
      </div>
    </>
  )
}

export const readJSON = async () => {
  try {
    const response = await fetch("/settings.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result: Data.JSONConfig = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown Error.");
    }
  }
}
export const convertJSONtoObj = (obj: Data.JSONConfig): [Data.SettingsData, Data.FolderData, Data.CardSetsData] => {
  // manually iterate through object and assign values to named classes
  const settingsData = readSettings(obj);
  const folderData = readFolders(obj);
  const cardSetsData = readCardSets(obj);

  return [settingsData, folderData, cardSetsData];
}

export const readSettings =  (obj: Data.JSONConfig): Data.SettingsData => {
  const settingsObj: Data.JSONSettings = obj.settings;
  let settingsData = new Data.SettingsData(settingsObj.darkMode);

  return settingsData;
}

export const readFolders =  (obj: Data.JSONConfig): Data.FolderData => {
  const folderObj: Data.JSONContent[] = obj.folders;
  const folders: Data.Content[] = [];
  loadFolders(folderObj, folders)

  return new Data.FolderData(folders);
}

export const readCardSets =  (obj: Data.JSONConfig): Data.CardSetsData => {
  const cardSetsObj: Data.JSONCardSets = obj.cardSets;
  const cardSetsData = new Map<string, FlashcardSet>();
  for (const [key, set] of Object.entries(cardSetsObj)) {
    // const c: Data.CardSet = new Data.CardSet(set.title, set.cards);
    const cards: Card[] = [];
    for (const card of set.cards) {
      cards.push(new Card(card[0], card[1]));
    }
    const c: FlashcardSet = new FlashcardSet(set.title, cards);
    cardSetsData.set(key, c);
  }

  return cardSetsData
}

// recursively convert all json interfaces in the read array into class
// objects and push them to the write array
const loadFolders = (read: Data.JSONContent[], write: Data.Content[]) => {
  for (const content of read) {
    // check if type is folder
    let c: Data.JSONContent;
    let obj: Data.Content;
    if (Object.hasOwn(content, "contents")) {
      c = content as Data.JSONFolder;
      const arr: Data.Content[] = [];
      loadFolders(c.contents, arr);
      obj = new Data.Folder("", "", arr, c.title);
    // otherwise the object is a cardsetlink
    } else {
      c = content as Data.JSONCardSetLink;
      obj = new Data.CardSetLink("", "", c.key, c.title);
    }
    write.push(obj);
  }
}

export default FileManager