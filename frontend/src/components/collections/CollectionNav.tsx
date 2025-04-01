import { Icon } from '@iconify/react';
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
      {/* Title Row with Three-Dot Icon */}
      <div className="flex items-center justify-between">
        <h2 className="text-theme-text text-xl font-semibold">Collections</h2>
        <button className="text-gray-500 hover:text-gray-700 transition">
          <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => handleTabChange('favourites')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'favourites'
              ? 'bg-gray-600 text-white'
              : 'bg-transparent border border-gray-600 text-theme-text hover:bg-gray-800'
          }`}
        >
          Favourites
        </button>
        <button
          onClick={() => handleTabChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'all'
              ? 'bg-gray-600 text-white'
              : 'bg-transparent border border-gray-600 text-theme-text hover:bg-gray-800'
          }`}
        >
          All Collections
        </button>
      </div>
    </div>
  );
};