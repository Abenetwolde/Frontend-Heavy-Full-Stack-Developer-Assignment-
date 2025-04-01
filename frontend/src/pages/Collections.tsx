import { CollectionNav } from '../components/collections/CollectionNav';
import { CollectionCard } from '../components/collections/CollectionCard';
import { AddCollectionCard } from '../components/collections/AddCollectionCard';
import { MainLayout } from '../layouts/MainLayout';
import { Collection } from '../types/collection';

// Mock data (replace with API data later)
const collections: Collection[] = [
  {
    id: 1,
    name: 'School',
    taskCount: 8,
    completedTasks: 4,
    icon: 'mdi:book',
    color: 'bg-pink-500',
  },
  {
    id: 2,
    name: 'Personal',
    taskCount: 5,
    completedTasks: 3,
    icon: 'mdi:account',
    color: 'bg-teal-500',
  },
  {
    id: 3,
    name: 'Design',
    taskCount: 15,
    completedTasks: 15,
    icon: 'mdi:pencil',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    name: 'Groceries',
    taskCount: 10,
    completedTasks: 2,
    icon: 'mdi:cart',
    color: 'bg-yellow-500',
  },
];

export const Collections: React.FC = () => {
  const handleTabChange = (tab: 'favourites' | 'all') => {
    console.log(`Tab changed to: ${tab}`);
  };

  return (
    <MainLayout activeTab="collections">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
        <CollectionNav onTabChange={handleTabChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))}
          {/* Add Collection Card */}
          <div className="h-[100px]">
            <AddCollectionCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};