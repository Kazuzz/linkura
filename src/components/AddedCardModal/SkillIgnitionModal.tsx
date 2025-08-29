import React from 'react';
import { Card } from '../../types';
import { getAddedCards } from '../../utils/addedCards';

interface Props {
  card: Card;
  lang: 'jp' | 'en';
  onClose: () => void;
  showAddedCards: (cards: Card[]) => void;
}

const SkillIgnitionModal: React.FC<Props> = ({ card, lang, onClose, showAddedCards }) => {
  const normal = card.ignitionSkill?.normal ?? {};
  const ignited = card.ignitionSkill?.ignited ?? {};

  const addedCards = getAddedCards(card, lang);

  console.log('addedCards:', addedCards);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <div className="skill-box">
            <div className="detail-name-box">
              <h3>通常</h3>
            </div>
            <div className="skill-text-box">
              <h3 className="title">
                [{normal.ap ?? '-'}AP] {normal[`name_${lang}` as keyof typeof normal] ?? ''}
              </h3>
            <span className="text">{normal[`content_${lang}` as keyof typeof normal] ?? ''}</span>
            {addedCards.length > 0 && (
              <div className="open-modal-button">
                <img src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`} 
                  alt="Show Added Cards" 
                  onClick={() => showAddedCards(addedCards)}
                />
              </div>
            )}
            </div>
          </div>

        <div className="passive-box">
          <div className="detail-name-box">
            <h3>イグニッションモード</h3>
          </div>
          <div className="passive-text-box">
            <h3 className="title">
              [{ignited.ap ?? '-'}AP] {ignited[`name_${lang}` as keyof typeof ignited] ?? ''}
            </h3>
          <span className="text">{ignited[`content_${lang}` as keyof typeof ignited] ?? ''}</span>
          </div>
         </div>

         <div className="close-modal-button">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Close.svg`} alt="Close" onClick={onClose} />
        </div>

      </div>
    </div>
  );
};

export default SkillIgnitionModal;