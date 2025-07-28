import React, { useState, useEffect } from 'react';
import CardComponent from '../Card/Card';
import { Card as CardType, FilterState } from '../../types';

interface CardListProps {
  cards: CardType[];
  filters: FilterState;
  isSidebarOpen: boolean;
  searchQuery: string;
  showAddedCards: (cards: CardType[]) => void;
  showIgnition: (card: CardType) => void;
  lang: 'jp' | 'en';
}

const CardList: React.FC<CardListProps> = ({ cards, filters, isSidebarOpen, searchQuery, showAddedCards, lang, showIgnition }) => {
  const [displayedCards, setDisplayedCards] = useState<CardType[]>(cards);

  useEffect(() => {
    const filtered = cards.filter(card =>
      (!filters.rarity || String(card.rarity ?? '') === filters.rarity) &&
      (!filters.character || String(card.character ?? '') === filters.character) &&
      (!filters.collection || String(card.collection ?? '') === filters.collection) &&
      (!searchQuery || (card[`name_${lang}`] ?? '').toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setDisplayedCards(filtered);
  }, [filters, cards, searchQuery, lang]);

  return (
    <div className={`card-list${isSidebarOpen ? ' shifted' : ''}`}>
      {displayedCards.map(card => (
        <CardComponent
          key={card[`name_${lang}`]}
          card={card} 
          characters={{}} 
          collections={{}}
          showAddedCards={showAddedCards}
          lang={lang}
          showIgnition={showIgnition}
        />
      ))}
    </div>
  );
};

export default CardList;

