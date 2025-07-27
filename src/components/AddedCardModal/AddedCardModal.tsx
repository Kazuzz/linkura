import React from 'react';
import { Card as CardType } from '../../types';

interface AddedCardModalProps {
  addedCards: CardType[];
  onClose: () => void;
}

const AddedCardModal: React.FC<AddedCardModalProps> = ({ addedCards, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {addedCards.map((card, idx) => (
          <div className="added-card" key={idx}>
            <h3 style={{ fontSize: '36px' }}>{card.name}</h3>

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
        ))}

        <div className="close-modal-button">
          <img src="/assets/icons/Close.svg" alt="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddedCardModal;

