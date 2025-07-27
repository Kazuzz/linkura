import React from 'react';
import { Card, Mappings } from '../../types';
import cardsData from '../../data/cards.json';

interface CardProps {
  card: Card;
  characters: Mappings['characters'];
  collections: Mappings['collections'];
  showAddedCards: (cards: Card[]) => void;
}

const CardComponent: React.FC<CardProps> = ({ card, characters, collections, showAddedCards }) => {
  const addedCardNames = [
    ...Array.from(card.skillContent.matchAll(/([^\s。()「」『』]+カード(?:《[^》]+》)?)を.*?山札に追加する/g)),
    ...Array.from((card.specialContent ?? '').matchAll(/([^\s。()「」『』]+カード(?:《[^》]+》)?)を.*?山札に追加する/g)),
    ...Array.from((card.passiveContent ?? '').matchAll(/([^\s。()「」『』]+カード(?:《[^》]+》)?)を.*?山札に追加する/g)),
  ].map(match => match[1]);

  const allCards: Card[] = cardsData.cards.map((c): Card => ({
    ...c,
    rarity: String(c.rarity ?? ''),
    character: String(c.character ?? ''),
    collection: String(c.collection ?? ''),
    skillName: String(c.skillName ?? ''),
    specialName: String(c.specialName ?? ''),
    specialAP: Number(c.specialAP ?? 0),
    specialAPMax: Number(c.specialAPMax ?? 0),
    specialContent: String(c.specialContent ?? ''),
    imageFront: String(c.imageFront ?? ''),
    imageBack: String(c.imageBack ?? ''),
    passiveName: String(c.passiveName ?? ''),
    passiveContent: String(c.passiveContent ?? ''),
  }));


  const addedCards = allCards.filter(c =>
    addedCardNames.some(type =>
      c.name.startsWith(type)
    )
  );

  return (
    <div className="card-box">
      <div className="name-box">
        <h2 className="card-title">{card.name}</h2>
      </div>

      <div className="card-images">
        {card.imageFront && (
          <img src={card.imageFront} alt={`${card.name} Front`} className="card-image" />
        )}
        {card.imageBack && (
          <img src={card.imageBack} alt={`${card.name} Back`} className="card-image" />
        )}
      </div>

      <div className="card-details">
        {card.specialContent && (
          <div className="special-box">
            <div className="detail-name-box">
              <h3>スペシャルアピール</h3>
            </div>
            <div className="special-text-box">
              <h3 className="title">
                [{card.specialAP ?? 0}-{card.specialAPMax ?? 0}AP] {card.specialName ?? ''}
              </h3>
              <span className="text">{card.specialContent}</span>
            </div>
          </div>
        )}

        {card.skillContent && (
          <div className="skill-box">
            <div className="detail-name-box">
              <h3>スキル</h3>
            </div>
            <div className="skill-text-box">
              <h3 className="title">
              [{card.skillAP}AP] {card.skillName ?? ''}
            </h3>
            <span className="text">{card.skillContent}</span>
          </div>
          </div>
        )}

        {card.passiveContent && (
          <div className="passive-box">
            <div className="detail-name-box">
              <h3>特性</h3>
            </div>
            <div className="passive-text-box">
              <h3 className="title">{card.passiveName ?? ''}</h3>
              <span className="text">{card.passiveContent}</span>
            </div>
          </div>
        )}
      </div>

      {addedCards.length > 0 && (
        <div className="open-modal-button">
          <img src="/assets/icons/Card effect.svg" alt="Show Added Cards" onClick={() => showAddedCards(addedCards)}/>
        </div>
      )}
    </div>
  );
};

export default CardComponent;

