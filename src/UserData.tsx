import type { FlashcardSet } from "./FlashcardSet"

// represents the JSON file read into memory
export class UserData {
  private settings: SettingsData
  private folders: FolderData
  private cardSets: CardSetsData

  constructor(settings: SettingsData, folders: FolderData, cardSets: CardSetsData) {
    this.settings = settings
    this.folders = folders
    this.cardSets = cardSets
  }
  getSettings(): SettingsData {
    return this.settings;
  }

  getFolders(): FolderData {
    return this.folders;
  }

  getCardSets(): CardSetsData {
    return this.cardSets;
  }
}

export class SettingsData {
  private darkMode: boolean

  constructor(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}

export class FolderData {
  private contents: Content[]

  constructor(folders: Content[]) {
    this.contents = folders;
  }

  getFolders(): Content[] {
    return this.contents;
  }
}

export type CardSetsData = Map<string, FlashcardSet>;
// export class CardSetsData {
//   private title: string
//   private cardSets: Tuple[]

//   constructor(title: string, cards: Tuple[]) {
//     this.title = title;
//     this.cards = cards;
//   }

//   getTitle(): string {
//     return this.title;
//   }

//   getCard(i: number): Tuple {
//     return this.cards[i];
//   }
// }

export abstract class Content {
  private imagePath: string
  private color: string
  private title: string;

  constructor(imagePath: string, color: string, title: string) {
    this.imagePath = imagePath;
    this.color = color;
    this.title = title;
  }

  getImagePath(): string {
    return this.imagePath;
  }

  getColor(): string {
    return this.color;
  }

  getTitle(): string {
    return this.title;
  }
}

export class Folder extends Content {
  private contents: Content[]

  constructor(imagePath: string, color: string, contents: Content[], title: string) {
    super(imagePath, color, title);
    this.contents = contents;
  }

  getContents(): Content[] {
    return this.contents;
  }
  getContent(i: number): Content {
    return this.contents[i];
  }
}

export class CardSetLink extends Content {
  private key: string;

  constructor(imagePath: string, color: string, key: string, title: string) {
    super(imagePath, color, title);
    this.key = key;
  }

  getKey(): string {
    return this.key;
  }
}

// types that represent the raw JSON object before full serialization
export type Tuple = [string, string];
export interface JSONCardSet {
  title: string;
  cards: Tuple[];
}
export interface JSONFolder extends IContent {
  title: string;
  contents: JSONContent[];
}
export type JSONContent = JSONCardSetLink | JSONFolder;
interface IContent {
  imagePath: string;
  color: string;
  title: string;
}
export interface JSONCardSetLink extends IContent {
  key: string
}
export type JSONCardSets = { [key: string]: JSONCardSet };
export interface JSONConfig {
  settings: JSONSettings;
  folders: JSONContent[];
  cardSets: JSONCardSets;
}
export interface JSONSettings {
  darkMode: boolean;
}

export class CardSet {
  private title: string
  private cards: Tuple[]

  constructor(title: string, cards: Tuple[]) {
    this.title = title
    this.cards = cards
  }

  getTitle(): string {
    return this.title;
  }

  getCards(): Tuple[] {
    return this.cards;
  }
}