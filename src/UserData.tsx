export class UserData {
  private settings: SettingsData
  private folders: FolderData
  private cardSets: CardSetsData
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
  private folders: Content
}

export class CardSetsData {
}

export class Content {
  private imagePath : string
  private color : string
  private key : string

  constructor(imagePath: string, color: string, key: string) {
    this.imagePath = imagePath;
    this.color = color;
    this.key = key;
  }
}


export class CardSet {
  private title: string
  private cards: object

  constructor(title: string, cards: object) {
    this.title = title
    this.cards = cards
  }

  getTitle(): string {
    return this.title;
  }

  getCard
}