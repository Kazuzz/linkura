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
};

const allCards: Card[] = cardsData.cards.map((c): Card => ({
  ...c,
  rarity: String(c.rarity ?? ''),
  character: String(c.character ?? ''),
  collection: String(c.collection ?? ''),
  name_jp: String(c.name_jp ?? ''),
  name_en: String(c.name_en ?? ''),
  skillName_jp: String(c.skillName_jp ?? ''),
  skillName_en: String(c.skillName_en ?? ''),
  skillContent_jp: String(c.skillContent_jp ?? ''),
  skillContent_en: String(c.skillContent_en ?? ''),
  specialName_jp: String(c.specialName_jp ?? ''),
  specialName_en: String(c.specialName_en ?? ''),
  specialAP: Number(c.specialAP ?? 0),
  specialAPMax: Number(c.specialAPMax ?? 0),
  specialContent_jp: String(c.specialContent_jp ?? ''),
  specialContent_en: String(c.specialContent_en ?? ''),
  imageFront: String(c.imageFront ?? ''),
  imageBack: String(c.imageBack ?? ''),
  passiveName_jp: String(c.passiveName_jp ?? ''),
  passiveName_en: String(c.passiveName_en ?? ''),
  passiveContent_jp: String(c.passiveContent_jp ?? ''),
  passiveContent_en: String(c.passiveContent_en ?? ''),
}));

export function getAddedCards(card: Card, lang: 'jp' | 'en'): Card[] {
  const regex = addedCardRegex[lang];
  console.log('getAddedCards called with id:', card.id, typeof card.id);

  const addedCardNames = [
    ...safeMatchAll(card[`skillContent_${lang}`], regex),
    ...safeMatchAll(card[`specialContent_${lang}`], regex),
    ...safeMatchAll(card[`passiveContent_${lang}`], regex),
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