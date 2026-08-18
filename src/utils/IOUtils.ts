import * as Data from "../types/UserData.ts";
// import { FlashcardSet } from "./FlashcardSet.ts";
// import Card from "./Card.tsx";

export const readJSON = async () => {
  try {
    const response = await fetch("/settings.json");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result: Data.Config = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown Error.");
    }
  }
}
// const convertJSONtoObj = (obj: Data.JSONConfig): [Data.SettingsData, Data.FolderData, Data.CardSetsData] => {
//   // manually iterate through object and assign values to named classes
//   const settingsData = readSettings(obj);
//   const folderData = readFolders(obj);
//   const cardSetsData = readCardSets(obj);
//
//   return [settingsData, folderData, cardSetsData];
// }
//
// const readSettings = (obj: Data.JSONConfig): Data.SettingsData => {
//   const settingsObj: Data.JSONSettings = obj.settings;
//   const settingsData = new Data.SettingsData(settingsObj.darkMode);
//
//   return settingsData;
// }
//
// const readFolders =  (obj: Data.JSONConfig): Data.FolderData => {
//   const folderObj: Data.JSONContent[] = obj.folders;
//   const folders: Data.Content[] = [];
//   loadFolders(folderObj, folders)
//
//   return new Data.FolderData(folders);
// }
//
// export const readCardSets = (obj: Data.Config): Data.CardSetsData => {
//   const cardSetsObj: Data.CardSet = obj.cardSets;
//   const cardSetsData = new Map<string, FlashcardSet>();
//   for (const [key, set] of Object.entries(cardSetsObj)) {
//     // const c: Data.CardSet = new Data.CardSet(set.title, set.cards);
//     const cards: Card[] = [];
//     for (const card of set.cards) {
//       cards.push(new Card(card[0], card[1]));
//     }
//     const c: FlashcardSet = new FlashcardSet(set.title, cards);
//     cardSetsData.set(key, c);
//   }
//
//   return cardSetsData
// }
//
// // recursively convert all json interfaces in the read array into class
// // objects and push them to the write array
// const loadFolders = (read: Data.JSONContent[], write: Data.Content[]) => {
//   for (const content of read) {
//     // check if type is folder
//     let c: Data.JSONContent;
//     let obj: Data.Content;
//     if (Object.hasOwn(content, "contents")) {
//       c = content as Data.JSONFolder;
//       const arr: Data.Content[] = [];
//       loadFolders(c.contents, arr);
//       obj = new Data.Folder("", "", arr, c.title);
//     // otherwise the object is a cardsetlink
//     } else {
//       c = content as Data.JSONCardSetLink;
//       obj = new Data.CardSetLink("", "", c.key, c.title);
//     }
//     write.push(obj);
//   }
// }
