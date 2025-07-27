export interface Card {
  name: string;
  skillAP: number;
  skillContent: string;
  passiveName?: string;
  passiveContent?: string;

  // Optional fields for real cards only
  rarity?: string;
  character?: string;
  collection?: string;
  imageFront?: string;
  imageBack?: string;
  skillName?: string;
  specialName?: string;
  specialAP?: number;
  specialAPMax?: number;
  specialContent?: string;
  hidden?: boolean;
}

export interface CharacterMapping {
  name: string;
  color: string;
}

export interface CollectionMapping {
  name: string;
}

export interface RarityMapping {
  name: string;
}

export interface Mappings {
  characters: { [key: string]: CharacterMapping };
  collections: { [key: string]: CollectionMapping };
  rarities: { [key: string]: RarityMapping };
}

export interface CardsData {
  cards: Card[];
  mappings: Mappings;
}

export interface FilterState {
  rarity: string;
  character: string;
  collection: string;
}