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

const addedCardRegex: Record<'jp' | 'en' , RegExp> = {
    jp: /([^\s。()「」『』]+カード(?:《[^》]+》)?)を.*?山札に追加する/g,
    en: /(?:one|two|[0-9]+)? ?types? of ([\w\s《》]+Card)/gi
  };

const CardComponent: React.FC<CardProps> = ({ card, characters, collections, showAddedCards, lang, showSkillIgnition, showPassiveIgnition }) => {
  
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

  const hasSkillIgnition = /《イグニッションモード》|《Ignition Mode》/.test(
    (card[`skillContent_${lang}`] ?? '')
  );

  const hasPassiveIgnition = /《イグニッションモード》|《Ignition Mode》/.test(
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

  const addedCards = allCards.filter(c =>
    addedCardNames.some(type =>
      ((c as any)[`name_${lang}`] ?? '').toLowerCase().includes(type.toLowerCase())
    )
  );

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
              <h3>スペシャルアピール</h3>
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
              <h3>スキル</h3>
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
              <h3>特性</h3>
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

