// the following types represent parts of the settings.json file
export type Tuple = [string, string];
export interface CardSet {
  title: string;
  cards: Tuple[];
}
export interface Folder extends IContent {
  title: string;
  contents: Content[];
}
export type Content = CardSetLink | Folder;
interface IContent {
  imagePath: string;
  color: string;
  title: string;
  key: string;
}
export interface CardSetLink extends IContent {}; 
export type CardSets = { [key: string]: CardSet };
export interface Config {
  settings: Settings;
  folders: Content[];
  cardSets: CardSets;
}
export interface Settings {
  darkMode: boolean;
}
