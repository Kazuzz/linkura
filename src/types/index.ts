export interface Card {
  id?: number;
  name_jp?: string;
  name_en?: string;
  skillAP?: number;
  skillContent_jp?: string;
  skillContent_en?: string;
  passiveName_jp?: string;
  passiveName_en?: string;
  passiveContent_jp?: string;
  passiveContent_en?: string;
  rarity?: string;
  character?: string;
  collection?: string;
  imageFront?: string;
  imageBack?: string;
  imageDress?: string;
  skillName_jp?: string;
  skillName_en?: string;
  specialName_jp?: string;
  specialName_en?: string;
  specialAP?: number;
  specialAPMax?: number;
  specialContent_jp?: string;
  specialContent_en?: string;
  hidden?: boolean;
  addedCard?: boolean;
  ignitionSkill?: {
    normal: IgnitionSkillDetail;
    ignited: IgnitionSkillDetail;
  };
  ignitionPassive?: {
    normal: IgnitionPassiveDetail;
    ignited: IgnitionPassiveDetail;
  };
}

export interface CharacterMapping {
  name: string;
  name_jp?: string;
  name_en?: string;
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

export interface IgnitionSkillDetail {
  name_jp?: string;
  name_en?: string;
  ap?: number;
  content_jp?: string;
  content_en?: string;
}

export interface IgnitionPassiveDetail {
  name_jp?: string;
  name_en?: string;
  content_jp?: string;
  content_en?: string;
}