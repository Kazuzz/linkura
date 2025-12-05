import React, {useMemo} from 'react';
import { Card, Mappings } from '../../types';
import { getAddedCards } from '../../utils/addedCards';

interface CardProps {
  card: Card;
  characters: Mappings['characters'];
  collections: Mappings['collections'];
  rarities: Mappings['rarities'];
  units: Mappings['units'];
  showAddedCards: (cards: Card[]) => void;
  showSkillIgnition: (card: Card) => void;
  showPassiveIgnition: (card: Card) => void;
  lang: 'jp' | 'en';
  gamemode: 'cg' | 'rg';
}

const IGNITION_REGEX = /姫芽の《イグニッションモード》の状態に応じて効果が変化する。|The effect changes based on Hime's 《Ignition Mode》 state./;
const LABELS = {
  specialAppeal: {
    cg: {jp: 'スペシャルアピール', en: 'Special Appeal'},
    rg: {jp: 'センタースキル', en: 'Center Skill'}
  },
  skill: {jp: 'スキル', en: 'Skill'},
  passive: {
    cg: {jp: '特性', en: 'Passive'},
    rg: {jp: 'センター特性', en: 'Center Passive'},
  }
};

const CardComponent: React.FC<CardProps> = ({ card, characters, collections, rarities, units, showAddedCards, lang, gamemode, showSkillIgnition, showPassiveIgnition }) => {
  const hasSkillIgnition = IGNITION_REGEX.test(card[`skillContent_${gamemode}_${lang}`] ?? '');
  const hasPassiveIgnition = IGNITION_REGEX.test(card[`passiveContent_${gamemode}_${lang}`] ?? '');
  const addedCards = useMemo(() => getAddedCards(card, lang), [card, lang]);

  return (
    <div className="card-box">
      <div className="name-box">
        <h2 className="card-title">［{card[`name_${lang}`]}］{characters?.[String(card.character)]?.[`name_${lang}`]} {rarities?.[String(card.rarity)]?.name}</h2>
      </div>

      <div className="card-images">
        {card.imageFront && (
          <img loading='lazy' decoding='async' src={`${process.env.PUBLIC_URL}/${card.imageFront}`} alt={`${card[`name_${lang}`]} Front`} className="card-image" />
        )}
        {card.imageBack && (
          <img loading='lazy' decoding='async' src={`${process.env.PUBLIC_URL}/${card.imageBack}`} alt={`${card[`name_${lang}`]} Back`} className="card-image" />
        )}
      </div>

      <div className="card-details">
        {card[`specialContent_${gamemode}_${lang}`] && (
          <div className="special-box">
            <div className="detail-name-box">
              <h3>{LABELS.specialAppeal[gamemode][lang]}</h3>
            </div>
            <div className="special-text-box">
              <h3 className="title">
                {gamemode !== 'rg' && ( <> [{card[`specialAP_${gamemode}`] ?? 0}-{card[`specialAPMax_${gamemode}`] ?? 0} AP]{' '} </> )} {card[`specialName_${gamemode}_${lang}`] ?? ''}
              </h3>
              <span className="text">{card[`specialContent_${gamemode}_${lang}`]}</span>
            </div>
          </div>
        )}

        {card[`skillContent_${gamemode}_${lang}`] && (
          <div className="skill-box">
            <div className="detail-name-box">
              <h3>{LABELS.skill[lang]}</h3>
            </div>
              <div className="skill-text-box">
                <h3 className="title">
                  [{card[`skillAP_${gamemode}`] ?? 0} AP] {card[`skillName_${gamemode}_${lang}`] ?? ''}
                </h3>
              <span className="text">{card[`skillContent_${gamemode}_${lang}`]}</span>
              {hasSkillIgnition && (
                <div className="open-modal-button">
                  <img 
                    loading='lazy'
                    src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`}
                    alt="Show Ignition Skills"
                    onClick={() => showSkillIgnition(card)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {card[`passiveContent_${gamemode}_${lang}`] && (
          <div className="passive-box">
            <div className="detail-name-box">
              <h3>{LABELS.passive[gamemode][lang]}</h3>
            </div>
            <div className="passive-text-box">
              <h3 className="title">{card[`passiveName_${gamemode}_${lang}`] ?? ''}</h3>
              <span className="text">{card[`passiveContent_${gamemode}_${lang}`]}</span>
              {hasPassiveIgnition && (
                <div className="open-modal-button">
                  <img
                    loading='lazy'
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

      {gamemode !== 'rg' &&addedCards.length > 0 && (
        <div className="open-modal-button">
          <img loading='lazy' src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`} 
            alt="Show Added Cards" 
            onClick={() => showAddedCards(addedCards)}
          />
        </div>
      )}

    </div>
  );
};

export default React.memo(CardComponent);
