import { useEffect, useState } from "react";
import { FileLeaf } from "./FileLeaf.tsx";
import { ContentCard } from "./ContentCard.tsx";
import "./FileManager.css";
import * as Data from "./UserData.ts";
import { Link } from "react-router";
import { readJSON } from "./IOUtils.ts";

// allows the user to view the folder structure and card sets
export function FileManager() {
  // const cards: string[] = ["Spanish 300", "Chemistry", "History HL", "Calculus 3/4", "Physics", "Computer Science", "Orchestra"]

  const [settingsData, setSettingsData] = useState<Data.Settings | null>(null);
  const [folders, setFolders] = useState<Data.Content[] | null>(null);
  // const [cardSetsData, setCardSetsData] = useState<Data.CardSets | null>(null);
  const [currentFolder, setCurrentFolder] = useState<Data.Content[] | null>(null);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      let ignore = false;
      const obj = await readJSON();
      if (!obj) {
        console.error("Invalid JSON");
        return;
      }
      const {settings, folders, cardSets} = obj;
      console.log(settings)
      console.log(folders)
      console.log(cardSets);

      if (!ignore) {
        setSettingsData(settings);
        setFolders(folders);
        // setCardSetsData(cardSets);
        setCurrentFolder(folders);
      }

      return () => {
        ignore = true
      };
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
            <span onClick={() => setCurrentFolder(folders)}>Home</span>
            <ol style={{paddingLeft:"20px"}}>
              {
                folders && folders.map((content, i) => {
                  // check if content is folder (TODO: might refactor into custom typeguard later)
                  if (Object.hasOwn(content, "contents")) {
                    return <FileLeaf key={i} item={content as Data.Folder} onClick={(folder: Data.Content[]) => setCurrentFolder(folder)} />;
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
            // check if content is folder (TODO: might refactor into custom typeguard later)
            if (Object.hasOwn(content, "contents")) {
              const f = content as Data.Folder;
              return (<ContentCard name={f.title} onClick={() => changeDirectory(f.contents)} key={i.toString()}/>);
            } else if (Object.hasOwn(content, "key")) {
              const c = content as Data.CardSetLink;
              return (<ContentCard name={c.title} link={`/quiz/${c.key}`} key={i.toString()}/>);
            } else {
              console.error("Something bad.")
            }
          })
        }
      </div>
    </>
  )
}


export default FileManager
