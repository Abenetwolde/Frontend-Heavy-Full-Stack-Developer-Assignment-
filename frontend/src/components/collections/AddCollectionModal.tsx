import { Icon } from '@iconify/react';
import { useState } from 'react';

interface Collection {
  id: number;
  name: string;
  icon: string;
  color: string;
  taskCount?: number;
  completedTasks?: number;
}

interface AddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collection: Collection) => void;
}

export const AddCollectionModal: React.FC<AddCollectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('mdi:folder');

  // Predefined list of icons for selection
  const availableIcons = [
    { name: 'Folder', value: 'mdi:folder' },
    { name: 'Book', value: 'mdi:book' },
    { name: 'Star', value: 'mdi:star' },
    { name: 'Heart', value: 'mdi:heart' },
    { name: 'Calendar', value: 'mdi:calendar' },
  ];

  // Predefined list of colors (you can expand this)
  const defaultColor = 'bg-purple-500'; // Default color for new collections

  const handleSave = () => {
    if (!name.trim()) return; // Prevent saving if name is empty

    const newCollection: Collection = {
      id: Date.now(), // Temporary ID
      name,
      icon: selectedIcon,
      color: defaultColor,
      taskCount: 0, // Default values for taskCount and completedTasks
      completedTasks: 0,
    };
    onSave(newCollection);
    onClose();
    setName('');
    setSelectedIcon('mdi:folder');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-theme-card rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
        {/* Modal Title */}
        <h3 className="text-theme-text text-lg font-semibold">Add New Collection</h3>

        {/* Collection Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection name"
          className="bg-[#2A3232] text-white p-3 rounded-lg text-sm placeholder-gray-400"
        />

        {/* Icon Selection */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white text-sm font-semibold">Select Icon</h4>
          <div className="flex gap-2 flex-wrap">
            {availableIcons.map((icon) => (
              <button
                key={icon.value}
                onClick={() => setSelectedIcon(icon.value)}
                className={`p-2 rounded-lg transition ${
                  selectedIcon === icon.value
                    ? 'bg-theme-accent text-white'
                    : 'bg-[#2A3232] text-white hover:bg-opacity-80'
                }`}
              >
                <Icon icon={icon.value} className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-gradient-start to-gradient-end text-white px-4 py-2 rounded-lg hover:from-gradient-start-hover hover:to-gradient-end-hover transition flex-1"
          >
            Add Collection
          </button>
          <button
            onClick={onClose}
            className="bg-[#2A3232] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};