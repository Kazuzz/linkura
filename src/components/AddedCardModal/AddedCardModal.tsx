import React, { useState } from 'react';
import { Card as CardType } from '../../types'; // adjust path if needed
import allCardsData from '../../data/cards.json';    // must contain { cards: [...] }

const addedCardRegex: Record<'jp' | 'en', RegExp> = {
  jp: /(.+?)を\d+種類.*?山札に追加する/g,
  en: /Add\s+\d+\s+types?\s+of\s+(.+?)\s*\(\s*\d+\s*card/gi,
};

interface AddedCardModalProps {
  addedCards: CardType[];
  onClose: () => void;
  lang: 'jp' | 'en';
}

const normalize = (s: string) => s?.normalize('NFKC').trim().toLowerCase();

const safeMatchAll = (text: string | undefined, regex: RegExp): RegExpMatchArray[] => {
  try {
    return Array.from((text ?? '').matchAll(regex));
  } catch {
    return [];
  }
};

const AddedCardModal: React.FC<AddedCardModalProps> = ({ addedCards, onClose, lang }) => {
  const [nestedCards, setNestedCards] = useState<CardType[] | null>(null);
  const allCards = allCardsData.cards as CardType[];
  const regex = addedCardRegex[lang];

  const getAddedCardsFrom = (card: CardType): CardType[] => {
    const addedNames = [
      ...safeMatchAll(card[`skillContent_cg_${lang}`], regex),
      ...safeMatchAll(card[`specialContent_cg_${lang}`], regex),
      ...safeMatchAll(card[`passiveContent_cg_${lang}`], regex),
    ].map(m => m[1]);

    return allCards.filter((c: CardType) => {
      const name = normalize(c[`name_${lang}`] ?? '');
      return addedNames.some(type => {
        const t = normalize(type);
        return name.includes(t) || t.includes(name);
      });
    });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content-wrapper">
          <div className="modal-content">
            {addedCards.map((card) => {
              const nested = getAddedCardsFrom(card);

              return (
                <div key={card.id} className="added-card">
                  <div className="add-card-name">
                    <h3>{card[`name_${lang}`]}</h3>
                  </div>
                  <div className="added-card-body">
                    <div className="added-card-image">
                      {card.imageDress && (
                        <img src={`${process.env.PUBLIC_URL}/${card.imageDress}`} alt={`${card[`name_${lang}`]} Dress`} className="card-image" />
                      )}
                    </div>

                    <div className="added-card-details">
                      {card[`skillContent_cg_${lang}`] && (
                        <div className="skill-box">
                          <div className="detail-name-box">
                            <h3>スキル</h3>
                          </div>
                          <div className="skill-text-box">
                            <h3 className="title">
                              [{card[`skillAP_cg`] ?? 0}AP] {card[`skillName_cg_${lang}`] ?? ''}
                            </h3>
                          <span className="text">{card[`skillContent_cg_${lang}`]}</span>
                          </div>
                        </div>
                      )}

                      {card[`passiveContent_cg_${lang}`] && (
                        <div className="passive-box">
                          <div className="detail-name-box">
                            <h3>特性</h3>
                          </div>
                          <div className="passive-text-box">
                            <h3 className="title">{card[`passiveName_cg_${lang}`] ?? ''}</h3>
                            <span className="text">{card[`passiveContent_cg_${lang}`] ?? ''}</span>
                          </div>
                        </div>
                      )}

                      {nested.length > 0 && (
                        <div className="open-modal-button">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/icons/Card effect.svg`}
                            alt="Show Ignition Skills"
                            onClick={() => setNestedCards(nested)}
                          />
                        </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="close-modal-button">
            <img src={`${process.env.PUBLIC_URL}/assets/icons/Close.svg`} alt="Close" onClick={onClose} />
          </div>
        </div>
      </div>

      {nestedCards && (
        <AddedCardModal
          addedCards={nestedCards}
          onClose={() => setNestedCards(null)}
          lang={lang}
        />
      )}
    </>
  );
};

export default AddedCardModal;