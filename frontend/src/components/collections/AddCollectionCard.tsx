import { Icon } from '@iconify/react';

interface AddCollectionCardProps {
  onClick: () => void; // Add onClick prop
}

export const AddCollectionCard: React.FC<AddCollectionCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-theme-card/80 rounded-lg p-4 flex items-center justify-center w-full h-[120px] transition hover:bg-opacity-60 cursor-pointer relative border-1 border-dashed border-theme-text/20"
    >
      {/* Plus Icon */}
      <Icon icon="mdi:plus" className="w-8 h-8 text-theme-text/70" />
    </div>
  );
};