import { Card } from '../types';
import cardsData from '../data/cards.json';

const addedCardRegex: Record<'jp' | 'en', RegExp> = {
  jp: /([^\s。()「」『』、]+カード(?:《[^》]+》)?)を.*?山札に追加する/g,
  en: /Add (?:one|two|\d+)? ?types? of ([\w\s]+Card(?:《[^》]+》)?)/gi,
};

function safeMatchAll(text: string | undefined, regex: RegExp): RegExpMatchArray[] {
  try {
    return Array.from((text ?? '').matchAll(regex));
  } catch {
    return [];
  }
}

function normalize(s: string): string {
  return s?.normalize('NFKC').trim().toLowerCase();
}

const addedCardOverrides: Record<number, number[]> = {
  25033010: [25033011],
  25033020: [25033021],
  25033030: [25033031],
  24072110: [24072111],
  24072120: [24072121],
  24072130: [24072131],
  25032010: [25032011, 25032012, 25032013],
};

const allCards: Card[] = cardsData.cards.map((c): Card => ({
  ...c,
  rarity: String(c.rarity ?? ''),
  character: String(c.character ?? ''),
  collection: String(c.collection ?? ''),
  name_jp: String(c.name_jp ?? ''),
  name_en: String(c.name_en ?? ''),
  skillName_cg_jp: String(c.skillName_cg_jp ?? ''),
  skillName_cg_en: String(c.skillName_cg_en ?? ''),
  skillContent_cg_jp: String(c.skillContent_cg_jp ?? ''),
  skillContent_cg_en: String(c.skillContent_cg_en ?? ''),
  specialName_cg_jp: String(c.specialName_cg_jp ?? ''),
  specialName_cg_en: String(c.specialName_cg_en ?? ''),
  specialAP_cg: Number(c.specialAP_cg ?? 0),
  specialAPMax_cg: Number(c.specialAPMax_cg ?? 0),
  specialContent_cg_jp: String(c.specialContent_cg_jp ?? ''),
  specialContent_cg_en: String(c.specialContent_cg_en ?? ''),
  imageFront: String(c.imageFront ?? ''),
  imageBack: String(c.imageBack ?? ''),
  passiveName_cg_jp: String(c.passiveName_cg_jp ?? ''),
  passiveName_cg_en: String(c.passiveName_cg_en ?? ''),
  passiveContent_cg_jp: String(c.passiveContent_cg_jp ?? ''),
  passiveContent_cg_en: String(c.passiveContent_cg_en ?? ''),
}));

export function getAddedCards(card: Card, lang: 'jp' | 'en'): Card[] {
  const regex = addedCardRegex[lang];
  console.log('getAddedCards called with id:', card.id, typeof card.id);

  const addedCardNames = [
    ...safeMatchAll(card[`skillContent_cg_${lang}`], regex),
    ...safeMatchAll(card[`specialContent_cg_${lang}`], regex),
    ...safeMatchAll(card[`passiveContent_cg_${lang}`], regex),
    ...safeMatchAll(card.ignitionSkill?.normal?.[`content_${lang}`], regex),
    ...safeMatchAll(card.ignitionSkill?.ignited?.[`content_${lang}`], regex),
  ].map(match => match[1]);

  const overrideIds = addedCardOverrides[card.id!];
  if (overrideIds) {
    console.log('Override used for', card.id, overrideIds);
    return allCards.filter(c => overrideIds.includes(c.id!));
  }
  console.log('Fallback used for', card.id, addedCardNames);

  return allCards.filter(c => {
    if (!c.addedCard) return false;
    const name = normalize(c[`name_${lang}`] ?? '');
    return addedCardNames.some(type => {
      const t = normalize(type);
      return name.includes(t) || t.includes(name);
    });
  });
}