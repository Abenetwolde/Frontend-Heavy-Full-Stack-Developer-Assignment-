import { Icon } from '@iconify/react';
import { Collection } from '../../types/collection';

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const progress = (collection.completedTasks / collection.taskCount) * 100;

  return (
    <div className="bg-theme-card rounded-lg p-4 flex flex-col gap-2 w-full max-w-[300px] sm:max-w-[250px] transition hover:bg-opacity-80">
      {/* Icon and Name */}
      <div className="flex items-center gap-3">
        <div className={`${collection.color} rounded-full p-2`}>
          <Icon icon={collection.icon} className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-theme-text text-lg font-semibold">{collection.name}</h3>
      </div>

      {/* Task Count and Progress */}
      <div className="flex items-center justify-between">
        <p className="text-theme-text text-sm">
          {collection.taskCount} {collection.taskCount === 1 ? 'task' : 'tasks'} done
        </p>
        <div className="relative w-8 h-8">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--color-accent)" // Use the accent color variable
              strokeWidth="4"
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};