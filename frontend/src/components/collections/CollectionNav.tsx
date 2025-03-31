import { useState } from 'react';

interface CollectionNavProps {
  onTabChange: (tab: 'favourites' | 'all') => void;
}

export const CollectionNav: React.FC<CollectionNavProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'favourites' | 'all'>('all');

  const handleTabChange = (tab: 'favourites' | 'all') => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-theme-text text-xl font-semibold">Collections</h2>
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange('favourites')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'favourites'
              ? 'bg-theme-accent text-white'
              : 'bg-theme-card text-theme-text hover:bg-opacity-80'
          }`}
        >
          Favourites
        </button>
        <button
          onClick={() => handleTabChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'all'
              ? 'bg-theme-accent text-white'
              : 'bg-theme-card text-theme-text hover:bg-opacity-80'
          }`}
        >
          All Collections
        </button>
      </div>
    </div>
  );
};