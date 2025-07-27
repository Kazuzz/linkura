import React, { useState } from 'react';
import Filter from './components/Filter/Filter';
import CardList from './components/CardList/CardList';
import cardsData from './data/cards.json';
import './App.css';
import AddedCardModal from './components/AddedCardModal/AddedCardModal';
import { Card } from './types';
import { IoSunny, IoMoon } from 'react-icons/io5';

function App() {
  const [filters, setFilters] = useState({ rarity: '', character: '', collection: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light'); 
  const { characters, collections, rarities } = cardsData.mappings;
  const allCards = cardsData.cards;
  const [modalCards, setModalCards] = useState<Card[] | null>(null);
  const closeModal = () => setModalCards(null);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <Filter
        filters={filters}
        setFilters={setFilters}
        characters={characters}
        collections={collections}
        rarities={rarities}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setSearchQuery={setSearchQuery}
      />
      <CardList
        cards={allCards
        .filter(card => !card.hidden) // ✅ hide dress/virtual cards
        .map(card => ({
          ...card,
          rarity: String(card.rarity ?? ''),
          character: String(card.character ?? ''),
          collection: String(card.collection ?? ''),
        }))}
        filters={filters}
        isSidebarOpen={isSidebarOpen}
        searchQuery={searchQuery}
        showAddedCards={setModalCards}
      />
      {/* Theme Toggle Button on the right */}
      <button onClick={toggleTheme} className="theme-button">
        {theme === 'light' ? <IoSunny color='black' /> : <IoMoon color='white' />}
      </button>

      {/* Modal for added cards */}
      {modalCards && (
        <AddedCardModal
          addedCards={modalCards}
          onClose={closeModal}
        />
      )}

    </div>
  );
}

export default App;
