import React, { useState } from 'react';
import Filter from '../components/Filter/Filter';
import CardList from '../components/CardList/CardList';
import cardsData from '../data/cards.json';
import AddedCardModal from '../components/AddedCardModal/AddedCardModal';
import SkillIgnitionModal from '../components/AddedCardModal/SkillIgnitionModal';
import PassiveIgnitionModal from '../components/AddedCardModal/PassiveIgnitionModal';
import { Card } from '../types';
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
  const [lang, setLang] = useState<'jp' | 'en'>('jp');
  const toggleLanguage = () => {
    setLang(prev =>
      prev === 'jp' ? 'en' : 'jp'
    );
  };
  const [skillIgnitionCard, setSkillIgnitionCard] = useState<Card | null>(null);
  const [passiveIgnitionCard, setPassiveIgnitionCard] = useState<Card | null>(null);

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
        .filter(card => !card.hidden)
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
        lang={lang}
        showSkillIgnition={setSkillIgnitionCard}
        showPassiveIgnition={setPassiveIgnitionCard}
      />
      {/* Theme Toggle Button on the right */}
      <div className='toggle-buttons'>
        <button onClick={toggleTheme} className="theme-button">
          {theme === 'light' ? <IoSunny color='black' /> : <IoMoon color='white' />}
        </button>

        <button className="lang-button" onClick={toggleLanguage}>
          {lang.toUpperCase()}
        </button>
      </div>


      {/* Modal for added cards */}
      {modalCards && (
        <AddedCardModal
          addedCards={modalCards}
          onClose={closeModal}
          lang={lang}  
        />
      )}

      {skillIgnitionCard && (
        <SkillIgnitionModal
          card={skillIgnitionCard}
          lang={lang}
          onClose={() => setSkillIgnitionCard(null)}
        />
      )}

       {passiveIgnitionCard && (
        <PassiveIgnitionModal
          card={passiveIgnitionCard}
          lang={lang}
          onClose={() => setPassiveIgnitionCard(null)}
        />
      )}

    </div>
  );
}

export default App;
