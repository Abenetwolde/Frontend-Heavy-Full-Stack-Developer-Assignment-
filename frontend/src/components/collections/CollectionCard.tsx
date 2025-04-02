import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Collection } from '../../types/collection';
import Chart from 'react-apexcharts';
import { useDeleteCollectionMutation } from '../../api/endpoints/collections';
// import { useDeleteCollectionMutation } from '../../store/api';

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }:any) => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteCollection] = useDeleteCollectionMutation();

  const progress = collection.taskCount === 0 ? 0 : (collection.completedTasks / collection.taskCount) * 100;
  const progressColor = collection.color.replace('bg-', '');

  const handleDelete = async () => {
    await deleteCollection(collection.id);
    setConfirmDelete(false);
  };
  const handleClick = () => {
    navigate(`/collections/${collection.name.toLowerCase()}`); // Keep name for URL, ID is fetched in CollectionTasks
  };
  return (
    <div
      className="bg-theme-card/80 rounded-lg p-4 flex flex-col gap-3 w-full transition hover:bg-opacity-60 cursor-pointer relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={handleClick}
    >
      {showDelete && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmDelete(true);
          }}
        >
          <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
        </button>
      )}
      <div className="flex items-center gap-3">
        <div className={`${collection.color} rounded-full p-2`}>
          <Icon icon={collection.icon} className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-theme-text/70 text-sm">
          <h3 className="text-theme-text text-base font-semibold">{collection.name}</h3>
          {collection.completedTasks}/{collection.taskCount} done
        </p>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-15 h-15">
            <Chart
              options={{
                chart: { type: 'radialBar' as const },
                plotOptions: {
                  radialBar: {
                    hollow: { size: '20%' },
                    track: { background: 'rgba(255, 255, 255, 0.2)' },
                    dataLabels: { show: false },
                  },
                },
                colors: [`var(--color-${progressColor})`],
                series: [progress],
                stroke: { lineCap: 'round' },
              }}
              series={[progress]}
              type="radialBar"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-theme-card p-4 rounded-lg shadow-lg">
            <p className="text-theme-text mb-4">Are you sure you want to delete this collection?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-theme-accent text-white rounded-md hover:bg-gradient-start-hover"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
