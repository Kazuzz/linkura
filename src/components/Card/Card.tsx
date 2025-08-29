import React from 'react';
import { Card, Mappings } from '../../types';
import { getAddedCards } from '../../utils/addedCards';

interface CardProps {
  card: Card;
  characters: Mappings['characters'];
  collections: Mappings['collections'];
  rarities: Mappings['rarities'];
  showAddedCards: (cards: Card[]) => void;
  showSkillIgnition: (card: Card) => void;
  showPassiveIgnition: (card: Card) => void;
  lang: 'jp' | 'en';
}

const CardComponent: React.FC<CardProps> = ({ card, characters, collections, rarities, showAddedCards, lang, showSkillIgnition, showPassiveIgnition }) => {
  const hasSkillIgnition = /姫芽の《イグニッションモード》の状態に応じて効果が変化する。|The effect changes based on Hime's 《Ignition Mode》 state./.test(
    (card[`skillContent_${lang}`] ?? '')
  );
  const hasPassiveIgnition = /姫芽の《イグニッションモード》の状態に応じて効果が変化する。|The effect changes based on Hime's 《Ignition Mode》 state./.test(
    (card[`passiveContent_${lang}`] ?? '')
  );

  const addedCards = getAddedCards(card, lang);

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
        <h2 className="card-title">［{card[`name_${lang}`]}］{characters?.[String(card.character)]?.[`name_${lang}`]} {rarities?.[String(card.rarity)]?.name}</h2>
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
