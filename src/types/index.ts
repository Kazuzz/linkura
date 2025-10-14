export interface Card {
  id?: number;
  name_jp?: string;
  name_en?: string;
  rarity?: string;
  character?: string;
  collection?: string;
  imageFront?: string;
  imageBack?: string;
  imageDress?: string;
  specialName_cg_jp?: string;
  specialName_cg_en?: string;
  specialAP_cg?: number;
  specialAPMax_cg?: number;
  specialContent_cg_jp?: string;
  specialContent_cg_en?: string;
  skillName_cg_jp?: string;
  skillName_cg_en?: string;
  skillAP_cg?: number;
  skillContent_cg_jp?: string;
  skillContent_cg_en?: string;
  passiveName_cg_jp?: string;
  passiveName_cg_en?: string;
  passiveContent_cg_jp?: string;
  passiveContent_cg_en?: string;
  
  specialName_rg_jp?: string;
  specialName_rg_en?: string;
  specialAP_rg?: number;
  specialAPMax_rg?: number;
  specialContent_rg_jp?: string;
  specialContent_rg_en?: string;
  skillName_rg_jp?: string;
  skillName_rg_en?: string;
  skillAP_rg?: number;
  skillContent_rg_jp?: string;
  skillContent_rg_en?: string;
  passiveName_rg_jp?: string;
  passiveName_rg_en?: string;
  passiveContent_rg_jp?: string;
  passiveContent_rg_en?: string;

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