import React, { useMemo } from 'react';
import CardComponent from '../Card/Card';
import { Card as CardType, FilterState } from '../../types';

interface CardListProps {
  cards: CardType[];
  filters: FilterState;
  isSidebarOpen: boolean;
  searchQuery: string;
  showAddedCards: (cards: CardType[]) => void;
  showSkillIgnition: (card: CardType) => void;
  showPassiveIgnition: (card: CardType) => void;
  characters: { [key: string]: { name: string; name_jp?: string; name_en?: string; color: string } };
  rarities: { [key: string]: { name: string } };
  collections: any;
  units: { [key: string]: { name: string } };
  lang: 'jp' | 'en';
  gamemode: 'cg' | 'rg';
}

const CardList: React.FC<CardListProps> = ({ cards, filters, isSidebarOpen, searchQuery, showAddedCards, lang, gamemode, showPassiveIgnition, showSkillIgnition, characters, rarities, collections, units }) => {
  const displayedCards = useMemo(() => { 
    return cards.filter(
      card => (!filters.rarity || String(card.rarity ?? '') === filters.rarity) && 
      (!filters.character || String(card.character ?? '') === filters.character) && 
      (!filters.collection || String(card.collection ?? '') === filters.collection) && 
      (!filters.unit || String(card.unit ?? '') === filters.unit) &&
      (!searchQuery || (card[`name_${lang}`] ?? '').toLowerCase().includes(searchQuery.toLowerCase())) 
    ); 
  }, [cards, filters, searchQuery, lang]);

  return (
    <div className={`card-list${isSidebarOpen ? ' shifted' : ''}`}>
      {displayedCards.map(card => (
        <CardComponent
          key={card.id} // Use a stable, unique ID
          card={card} 
          characters={characters} 
          collections={collections}
          rarities={rarities}
          units={units}
          showAddedCards={showAddedCards}
          lang={lang}
          gamemode={gamemode}
          showSkillIgnition={showSkillIgnition}
          showPassiveIgnition={showPassiveIgnition}
        />
      ))}
    </div>
  );
};

export default React.memo(CardList);

