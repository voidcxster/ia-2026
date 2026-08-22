// the following types represent parts of the settings.json file
export interface Config {
  settings: Settings;
  folders: Folders;
  cardSets: CardSets;
}

export interface Settings {
  darkMode: boolean;
}
export type Folders = Record<string, Folder>;
export type CardSets = Record<string, CardSet>;

export interface CardSet extends ContentBase {
  cards: Card[];
}
export interface Card {
  question: string;
  answer: string;
}
export type FolderIcon = Folder & ContentBase;
export interface Folder {
  folders: string[];
  cardSets: string[];
}
interface ContentBase {
  imagePath?: string;
  color?: string;
  title: string;
}

export type Content = FolderIcon | CardSet;
