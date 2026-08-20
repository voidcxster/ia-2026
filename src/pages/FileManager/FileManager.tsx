import { useEffect, type MouseEventHandler } from "react";
import { FileLeaf } from "@components/FileLeaf/FileLeaf.tsx";
import { ContentCard, type ContentCardProps } from "@components/ContentCard/ContentCard.tsx";
import styles from "./FileManager.module.css";
import * as Data from "@models/UserData.ts";
import { Link } from "react-router";
import { readJSON } from "@utils/IOUtils.ts";
import { useImmer } from "use-immer";

// allows the user to view the folder structure and card sets
export function FileManager() {
  const [settingsData, updateSettingsData] = useImmer<Data.Settings | null>(null);
  const [folders, updateFolders] = useImmer<Data.Content[] | null>(null);
  // const [cardSetsData, updateCardSetsData] = useImmer<Data.CardSets | null>(null);
  const [currentFolder, updateCurrentFolder] = useImmer<Data.Content[] | null>(null);

  useEffect(() => {
    console.log("useEffect");
    let ignore = false;

    (async () => {
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
        updateSettingsData(settings);
        updateFolders(folders);
        // updateCardSetsData(cardSets);
        updateCurrentFolder(folders);
      }
    })();

    return () => {
      ignore = true
    };
  }, [])

  // const initializeSettings: ChangeEventHandler = async () => {
  //   const fileInput: HTMLInputElement = fileInputRef.current!;
  //   const selectedFile = fileInput.files![0];
  //   [settingsData, folderData, cardSetsData] = await readJSON(selectedFile);
  // }

  function changeDirectory(folder: Data.Content[]) {
    updateCurrentFolder(folder);
  }

  return (
    <>
      <div className={styles.fileTree}>
        <ol>
          <li className={styles.fileTreeLeaf}>
            <span onClick={() => updateCurrentFolder(folders)}>Home</span>
            <ol style={{paddingLeft:"20px"}}>
              {
                folders && folders.map((content, i) => {
                  // check if content is folder (TODO: might refactor into custom typeguard later)
                  if (Object.hasOwn(content, "contents")) {
                    return <FileLeaf key={i} item={content as Data.Folder} onClick={(folder: Data.Content[]) => updateCurrentFolder(folder)} />;
                  }
                  // <li
                  // className={styles.fileTreeLeaf}
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
        <Link to="/generator" className={styles.addCardsLink}>Add Cards</Link>
        {/* <div className={styles.settingsDiv}>
          <label className={styles.settingsLabel} htmlFor="settings">Choose a settings file.</label>
          <input type="file" name="settings" className={styles.settings} onChange={initializeSettings} ref={fileInputRef}/>
        </div> */}
      </div>
      <div className={styles.gridWrapper}>
        {
          currentFolder && currentFolder.map((content, i, arr) => {
            let onClick: MouseEventHandler;
            // check if content is folder (TODO: might refactor into custom typeguard later)
            if (Object.hasOwn(content, "contents")) {
              const f = content as Data.Folder;
              onClick = () => changeDirectory(f.contents);
            } else { // content is cardsetlink
              onClick = () => {
                update //TODO: finish event handler
              }
            }
            const props: ContentCardProps = {
              content,
              onClick
            };
            return <ContentCard {...props} />;
          })
        }
      </div>
    </>
  )
}


export default FileManager
