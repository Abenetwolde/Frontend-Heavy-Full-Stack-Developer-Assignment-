import { useState } from 'react';
import { CollectionNav } from '../components/collections/CollectionNav';
import { CollectionCard } from '../components/collections/CollectionCard';
import { AddCollectionCard } from '../components/collections/AddCollectionCard';
import { MainLayout } from '../layouts/MainLayout';
import { Collection } from '../types/collection';
import { AddCollectionModal } from '../components/collections/AddCollectionModal';
import { useAddCollectionMutation, useGetCollectionsQuery } from '../api/endpoints/collections';

// Mock data (replace with API data later)
const initialCollections: Collection[] = [
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch collections with RTK Query
  const { data: collections, isLoading, error, refetch } = useGetCollectionsQuery(undefined, {
    pollingInterval: 30000, // Refetch every 30 seconds for "real-time" updates
  });

  // Mutation for adding a collection
  const [addCollection, { isLoading: isAdding }] = useAddCollectionMutation();

  const handleTabChange = (tab: 'favourites' | 'all'): void => {
    console.log(`Tab changed to: ${tab}`);
    // Add filtering logic here if needed
  };

  const handleAddCollection = async (newCollection: Partial<Collection>): Promise<void> => {
    try {
      await addCollection(newCollection).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to add collection:', err);
    }
  };

  if (isLoading) {
    return (
      <MainLayout activeTab="collections">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full p-4">
          {/* Skeleton for CollectionNav */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-1/3 bg-theme-card rounded animate-shimmer" />
            <div className="h-8 w-24 bg-theme-card rounded animate-shimmer" />
          </div>

          {/* Skeleton for Collection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 bg-theme-card rounded-lg animate-shimmer flex flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-start rounded-md" />
                  <div className="h-4 w-1/2 bg-theme-bg rounded" />
                </div>
                <div className="h-3 w-3/4 bg-theme-bg rounded" />
                <div className="h-3 w-1/3 bg-theme-bg rounded" />
              </div>
            ))}
            <div className="h-32 bg-theme-card rounded-lg animate-shimmer flex items-center justify-center">
              <div className="h-6 w-6 bg-gradient-start rounded-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout activeTab="collections">
        <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto w-full">
          <p className="text-red-500">Error loading collections: {(error as any).message}</p>
          <button
            onClick={refetch}
            className="bg-theme-button text-white px-4 py-2 rounded hover:bg-opacity-80"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeTab="collections">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
        <CollectionNav onTabChange={handleTabChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections?.map((collection) => (
            <div key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))}
          <div className="h-[100px]">
            <AddCollectionCard onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <AddCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCollection}
        isLoading={isAdding}
      />
    </MainLayout>
  );
};