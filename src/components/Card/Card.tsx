import React from 'react';
import { Card, Mappings } from '../../types';
import cardsData from '../../data/cards.json';

interface CardProps {
  card: Card;
  characters: Mappings['characters'];
  collections: Mappings['collections'];
  showAddedCards: (cards: Card[]) => void;
  showSkillIgnition: (card: Card) => void;
  showPassiveIgnition: (card: Card) => void;
  lang: 'jp' | 'en';
}

const CardComponent: React.FC<CardProps> = ({ card, characters, collections, showAddedCards, lang, showSkillIgnition, showPassiveIgnition }) => {
  const addedCardRegex: Record<'jp' | 'en' , RegExp> = {
    jp: /([^\s。()「」『』、]+カード(?:《[^》]+》)?)を.*?山札に追加する/g,
    en: /Add (?:one|two|\d+)? ?types? of ([\w\s]+Card(?:《[^》]+》)?)/gi
  };

  const regex = addedCardRegex[lang];
  const safeMatchAll = (text: string | undefined): RegExpMatchArray[] => {
    try {
      return Array.from((text ?? '').matchAll(regex));
    } catch {
      return [];
    }
  };

  const addedCardNames = [
    ...safeMatchAll(card[`skillContent_${lang}`]),
    ...safeMatchAll(card[`specialContent_${lang}`]),
    ...safeMatchAll(card[`passiveContent_${lang}`]),
  ].map(match => match[1]);

  const hasSkillIgnition = /姫芽の《イグニッションモード》の状態に応じて効果が変化する。|The effect changes based on Hime's 《Ignition Mode》 state./.test(
    (card[`skillContent_${lang}`] ?? '')
  );

  const hasPassiveIgnition = /姫芽の《イグニッションモード》の状態に応じて効果が変化する。|The effect changes based on Hime's 《Ignition Mode》 state./.test(
    (card[`passiveContent_${lang}`] ?? '')
  );

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

  function normalize(s: string): string {
    return s?.normalize('NFKC').trim().toLowerCase();
  }

  // Manual override: card.id → specific card names it adds
  const addedCardOverrides: Record<number, string[]> = {
    // Reunion Charm Card variants
    25033010: ['リユニオンチャームカード/Kozue'],
    25033020: ['リユニオンチャームカード/Tsuzuri'],
    25033030: ['リユニオンチャームカード/Megumi']
  };

  // Choose override or regex-extracted matches
  let addedCards: Card[] = [];

  const overrideNames = addedCardOverrides[card.id!];
  if (overrideNames) {
    // Use override: exact name match
    addedCards = allCards.filter(c =>
      overrideNames.includes(c[`name_${lang}`] ?? '')
    );
  } else {
    // Use normal regex-extracted name match
    addedCards = allCards.filter(c => {
      const name = normalize(c[`name_${lang}`] ?? '');
      return addedCardNames.some(type => {
        const t = normalize(type);
        return name.includes(t) || t.includes(name);
      });
    });
  }
  
  const LABELS = {
    specialAppeal: {
      jp: 'スペシャルアピール',
      en: 'Special Appeal',
    },
    skill: {
      jp: 'スキル',
      en: 'Skill',
    },
    passive: {
      jp: '特性',
      en: 'Passive',
    }
  };

  return (
    <div className="card-box">
      <div className="name-box">
        <h2 className="card-title">{card[`name_${lang}`]}</h2>
      </div>

      <div className="card-images">
        {card.imageFront && (
          <img src={`${process.env.PUBLIC_URL}/${card.imageFront}`} alt={`${card[`name_${lang}`]} Front`} className="card-image" />
        )}
        {card.imageBack && (
          <img src={`${process.env.PUBLIC_URL}/${card.imageBack}`} alt={`${card[`name_${lang}`]} Back`} className="card-image" />
        )}
      </div>

      <div className="card-details">
        {card[`specialContent_${lang}`] && (
          <div className="special-box">
            <div className="detail-name-box">
              <h3>{LABELS.specialAppeal[lang]}</h3>
            </div>
            <div className="special-text-box">
              <h3 className="title">
                [{card.specialAP ?? 0}-{card.specialAPMax ?? 0}AP] {card[`specialName_${lang}`] ?? ''}
              </h3>
              <span className="text">{card[`specialContent_${lang}`]}</span>
            </div>
          </div>
        )}

        {card[`skillContent_${lang}`] && (
          <div className="skill-box">
            <div className="detail-name-box">
              <h3>{LABELS.skill[lang]}</h3>
            </div>
              <div className="skill-text-box">
                <h3 className="title">
                  [{card.skillAP}AP] {card[`skillName_${lang}`] ?? ''}
                </h3>
              <span className="text">{card[`skillContent_${lang}`]}</span>
              {hasSkillIgnition && (
                <div className="open-modal-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`}
                    alt="Show Ignition Skills"
                    onClick={() => showSkillIgnition(card)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {card[`passiveContent_${lang}`] && (
          <div className="passive-box">
            <div className="detail-name-box">
              <h3>{LABELS.passive[lang]}</h3>
            </div>
            <div className="passive-text-box">
              <h3 className="title">{card[`passiveName_${lang}`] ?? ''}</h3>
              <span className="text">{card[`passiveContent_${lang}`]}</span>
              {hasPassiveIgnition && (
                <div className="open-modal-button">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`}
                    alt="Show Ignition Passive"
                    onClick={() => showPassiveIgnition(card)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {addedCards.length > 0 && (
        <div className="open-modal-button">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`} 
            alt="Show Added Cards" 
            onClick={() => showAddedCards(addedCards)}
          />
        </div>
      )}

    </div>
  );
};

export default CardComponent;
