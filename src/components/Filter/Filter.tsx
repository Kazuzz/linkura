import React from 'react';
import { FilterState, Mappings } from '../../types';

interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  characters: Mappings['characters'];
  collections: Mappings['collections'];
  rarities: Mappings['rarities'];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters, characters, collections, rarities, isSidebarOpen, toggleSidebar, setSearchQuery }) => {
  return (
    <>
      <button
        className={`sidebar-toggle ${isSidebarOpen ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
        data-icon={isSidebarOpen ? '✖' : '☰'}
      ></button>
      <div className={`filter-box ${isSidebarOpen ? 'open' : ''}`}>
        <div className="filter-scroll">
          {/* Rarity Filter */}
          <div className="filter-group">
            <div className="filter-options">
              {Object.keys(rarities).map(key => (
                <img
                  key={key}
                  src={`/assets/icons/${rarities[key].name}.png`} 
                  alt={rarities[key].name ?? String(rarities[key])} 
                  className={`filter-image ${filters.rarity === key ? 'selected' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, rarity: prev.rarity === key ? '' : key }))}
                />
              ))}
            </div>
          </div>

          {/* Character Filter */}
          <div className="filter-group">
            <div className="filter-options">
              {Object.keys(characters).map(key => (
                <button
                  key={key}
                  className={`filter-circle ${filters.character === key ? 'selected' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, character: prev.character === key ? '' : key }))}
                  style={{ borderColor: characters[key].color }} // Dynamic border color
                >
                  <img
                    src={`/assets/icons/${characters[key].name.toLowerCase().replace(/\s+/g, '_')}.png`}
                    alt={characters[key].name}
                    className="filter-icon"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Collection Filter */}
          <div className="filter-group">
            <div className="filter-options">
              {Object.keys(collections).map(key => (
                <img
                  key={key}
                  src={`/assets/icons/${collections[key].name}.png`}
                  alt={collections[key].name ?? String(collections[key])}
                  className={`filter-image ${filters.collection === key ? 'selected' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, collection: prev.collection === key ? '' : key }))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cards..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
    </>
  );
};

export default Filter;