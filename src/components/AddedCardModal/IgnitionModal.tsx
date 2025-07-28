import React from 'react';
import { Card } from '../../types';

interface Props {
  card: Card;
  lang: 'jp' | 'en';
  onClose: () => void;
}

const IgnitionModal: React.FC<Props> = ({ card, lang, onClose }) => {
  const normal = card.ignitionSkill?.normal ?? {};
  const ignited = card.ignitionSkill?.ignited ?? {};

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

export default IgnitionModal;