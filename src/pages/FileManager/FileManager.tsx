import { useEffect, useState, type MouseEventHandler } from "react";
import { FileLeaf } from "@components/FileLeaf/FileLeaf.tsx";
import { ContentCard, type ContentCardHandlers, type ContentCardProps } from "@components/ContentCard/ContentCard.tsx";
import styles from "./FileManager.module.css";
import * as Data from"@models/UserData.ts";
import { Link } from "react-router";
import { readJSON } from "@utils/IOUtils.ts";
import { useImmer } from "use-immer";
import type { Draft } from "immer";
import AddContent from "@components/AddContent/AddContent"

//key that points to the root node in the folders data structure
const ROOT_KEY = "(root)";

// allows the user to view the folder structure and card sets
export function FileManager() {
  const [config, updateConfig] = useImmer<Data.Config | null>(null);
  // const [settingsData, updateSettingsData] = useImmer<Data.Settings | null>(null);
  // const [folders, updateFolders] = useImmer<Data.Folders | null>(null);
  // const [cardSetsData, updateCardSetsData] = useImmer<Data.CardSets | null>(null);
  const [currentFolderKey, updateCurrentFolderKey] = useImmer<string>(ROOT_KEY);
  const [clipboard, setClipboard] = useState<string>("");
  const [isCut, setIsCut] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect");
    let ignore = false;

    (async () => {
      const config = await readJSON();
      if (!config) {
        console.error("Invalid JSON");
        return;
      }
      // console.log(settings)
      // console.log(folders)
      // console.log(cardSets);

      if (!ignore) {
        updateConfig(config);
      }
    })();

    return () => {
      ignore = true
    };
  }, [updateConfig])

  let settings: Data.Settings | null = null;
  let folders: Data.Folders | null = null;
  let cardSets: Data.CardSets | null = null;
  let currentFolder: Data.Folder | null  = null;
  let root: Data.Folder | null  = null;

  if (config != null) {
    settings = config.settings;
    folders = config.folders;
    cardSets = config.cardSets;
    root = folders[ROOT_KEY];
    currentFolder = folders[currentFolderKey];
  }

  useEffect(() => {
    if (settings == null) return;

    document.documentElement.dataset.theme = settings.darkMode ? "dark" : "light";
  }, [settings])

  function changeDirectory(folderKey: string) {
    updateCurrentFolderKey(folderKey);
  }

  function deleteFolder(draft: Draft<Data.Config>, key: string) {
    const folder = draft.folders[key];

    // delete child card sets
    deleteCardSets(draft.cardSets, ...folder.cardSets);

    deleteFolderReferences(draft.folders, key, ROOT_KEY);

    // delete child folders recursively
    folder.folders.forEach((fkey) => deleteFolder(draft, fkey));

    // delete folder itself
    delete draft.folders[key];
  }

  function deleteFolderReferences(draft: Draft<Data.Folders>, deleteKey: string, iterKey: string) {
    // get folder
    const folder = draft[iterKey];
    // remove references to the deleted card set
    let found = false;
    folder.folders = folder.folders .filter(
      (fkey) => {
        if (deleteKey !== fkey) {
          return true;
        }
        found = true;
        return false;
      });
    // recursively delete references from children
    if (!found) {
      const folderKeys = folder.folders;
      folderKeys.forEach((folderKey) => deleteFolderReferences(draft, folderKey, folderKey));
    }
  }

  function deleteCardSets(draft: Draft<Data.CardSets>, ...keys: string[]) {
    for (const key in keys) {
      delete draft[key];
    }
  }

  function deleteCardSetReferences(draft: Draft<Data.Folders>, folderKey: string, ...keys: string[]) {
    // get folder
    const folder = draft[folderKey];
    // remove references to the deleted card set
    folder.cardSets = folder.cardSets
      .filter((ckey) => !keys.includes(ckey));
    // recursively delete references from children
    const folderKeys = folder.folders;
    folderKeys.forEach((folderKey) => deleteCardSetReferences(draft, folderKey, ...keys));
  }

  return (
    <>
      <div className={styles.fileTree}>
        <ol>
          <li className={styles.fileTreeLeaf}>
            <span onClick={() => updateCurrentFolderKey(ROOT_KEY)}>Home</span>
            <ol style={{paddingLeft:"20px"}}>
              {
                root && root.folders.map((key) => {
                  if (folders == null) return;
                  const folder: Data.FolderIcon = folders[key] as Data.FolderIcon;
                  return (
                    <FileLeaf 
                      key={key}
                      contentKey={key}
                      item={folder}
                      onClick={(key) => changeDirectory(key)}
                      folders={folders}
                    />
                  );
                })
              }
            </ol>
          </li>
        </ol>
        <Link to="/generator" className={styles.addCardsLink}>Add Cards</Link>
      </div>
      <div className={styles.gridWrapper}>
        { // handle folders first
          currentFolder && currentFolder.folders.map((key) => {
            if (folders) {
              const onClick: MouseEventHandler = () => changeDirectory(key);
              const handlers: ContentCardHandlers = {
                handleCopyClick: (e) => {
                  e.stopPropagation();
                  setClipboard(key);
                },
                handleCutClick: (e) => {
                  e.stopPropagation();
                  setClipboard(key);
                  setIsCut(true);
                },
                handleDeleteClick: (e) => {
                  e.stopPropagation();
                  // remove content data
                  updateConfig(draft => {
                    if (draft == null) return;
                    deleteFolder(draft, key);
                  });
                }
              }
              const f = folders[key];
              const props: ContentCardProps = {
                content: f as Data.Content,
                contentKey: key,
                onClick,
                handlers
              };
              return <ContentCard {...props} key={key}/>;
            }
          })
        }
        { // handle cardsets
          currentFolder && currentFolder.cardSets.map((key) => {
            // check if content is folder (TODO: might refactor into custom typeguard later)
            if (cardSets) {
              const c = cardSets[key];
              const handlers: ContentCardHandlers = {
                handleCopyClick: (e) => {
                  e.stopPropagation();
                  setClipboard(key);
                },
                handleCutClick: (e) => {
                  e.stopPropagation();
                  setClipboard(key);
                  setIsCut(true);
                },
                handleDeleteClick: (e) => {
                  e.stopPropagation();
                  // remove content data
                  // delete the card set data
                  updateConfig(draft => {
                    if (draft == null) return;
                      deleteCardSets(draft.cardSets, key);
                  })
                  // delete all references to the card set in root & folders
                  updateConfig(draft => {
                    if (draft == null || root == null) return;
                      deleteCardSetReferences(draft.folders, ROOT_KEY, key);
                  });
                }
              }
              const props: ContentCardProps = {
                content: c,
                contentKey: key,
                handlers
              };
              return <ContentCard {...props} key={key}/>;
            }
          })
        }
        <AddContent />
      </div>
    </>
  )
}


export default FileManager
