import { Icon } from '@iconify/react';

export const AddCollectionCard: React.FC = () => {
  return (
    <div className="bg-theme-card/80 rounded-lg p-4 flex items-center justify-center w-full h-[120px] transition hover:bg-opacity-60 cursor-pointer relative border-1 border-dashed border-theme-text/20">
      {/* Plus Icon */}
      <Icon icon="mdi:plus" className="w-8 h-8 text-theme-text/70" />

      {/* Red Dot */}
      {/* <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full" /> */}
    </div>
  );
};