import React, { useState, useEffect } from 'react';
import CardComponent from '../Card/Card';
import { Card as CardType, FilterState } from '../../types';

interface CardListProps {
  cards: CardType[];
  filters: FilterState;
  isSidebarOpen: boolean;
  searchQuery: string;
  showAddedCards: (cards: CardType[]) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, filters, isSidebarOpen, searchQuery, showAddedCards }) => {
  const [displayedCards, setDisplayedCards] = useState<CardType[]>(cards);

  useEffect(() => {
    const filtered = cards.filter(card =>
      (!filters.rarity || String(card.rarity ?? '') === filters.rarity) &&
      (!filters.character || String(card.character ?? '') === filters.character) &&
      (!filters.collection || String(card.collection ?? '') === filters.collection) &&
      (!searchQuery || card.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setDisplayedCards(filtered);
  }, [filters, cards, searchQuery]);

  return (
    <div className={`card-list${isSidebarOpen ? ' shifted' : ''}`}>
      {displayedCards.map(card => (
        <CardComponent
          key={card.name}
          card={card} 
          characters={{}} 
          collections={{}}
          showAddedCards={showAddedCards}
        />
      ))}
    </div>
  );
};

export default CardList;

