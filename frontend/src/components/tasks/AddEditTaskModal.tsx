import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { collections } from '../../data/dummyData';
import { useNavigate } from 'react-router-dom';

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  collectionId: number;
  fromNavbar?: boolean; // New prop to indicate if called from navbar
}

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  collectionId,
  fromNavbar = false,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(task?.name || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [tag, setTag] = useState(task?.tag || '');
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(
    task?.collection_id || collectionId
  );
  const [subTasks, setSubTasks] = useState<Task[]>(task?.subTasks || []);
  const [isSubTasksExpanded, setIsSubTasksExpanded] = useState(false);
  const [flagColor, setFlagColor] = useState<'red' | 'green' | ''>(task?.tag === 'Today' ? 'green' : '');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setCompleted(task.completed);
      setTag(task.tag || '');
      setSelectedCollectionId(task.collection_id);
      setSubTasks(task.subTasks || []);
      setFlagColor(task.tag === 'Today' ? 'green' : task.tag ? 'red' : '');
    } else {
      setName('');
      setCompleted(false);
      setTag('');
      setSelectedCollectionId(collectionId);
      setSubTasks([]);
      setFlagColor('');
    }
  }, [task, collectionId]);

  const handleAddSubTask = () => {
    setSubTasks([
      ...subTasks,
      {
        id: Date.now(),
        name: 'New Subtask',
        completed: false,
        collection_id: selectedCollectionId,
      },
    ]);
    setIsSubTasksExpanded(true);
  };

  const handleRemoveSubTask = (id: number) => {
    setSubTasks(subTasks.filter((subTask) => subTask.id !== id));
  };

  const handleSubTaskChange = (id: number, newName: string) => {
    setSubTasks(
      subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, name: newName } : subTask
      )
    );
  };

  const handleFlagToggle = () => {
    if (flagColor === '') {
      setFlagColor('red');
      setTag('');
    } else if (flagColor === 'red') {
      setFlagColor('green');
      setTag('Today');
    } else {
      setFlagColor('');
      setTag('');
    }
  };

  const handleSave = () => {
    const updatedTask: Task = {
      id: task?.id || Date.now(),
      name,
      completed,
      tag: tag || undefined,
      collection_id: selectedCollectionId,
      subTasks,
    };
    onSave(updatedTask);
    onClose();
    // Redirect to the selected collection page if called from navbar
    if (fromNavbar) {
      navigate(`/collections/${selectedCollectionId}`);
    }
  };

  const currentCollection = collections.find((col) => col.id === selectedCollectionId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:items-center lg:justify-center">
      <div className="bg-theme-card rounded-t-lg lg:rounded-lg p-6 w-full max-w-md flex flex-col gap-4 absolute bottom-0 lg:bottom-auto lg:top-auto lg:max-w-lg">
        {/* Task Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
          className="bg-[#2A3232] text-white p-3 rounded-lg text-sm placeholder-gray-400"
        />

        {/* Collection Selection */}
        {fromNavbar ? (
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm font-semibold">Collection</h3>
            <select
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(Number(e.target.value))}
              className="bg-[#2A3232] text-white p-3 rounded-lg text-sm"
            >
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className={`${currentCollection?.color} rounded-full p-1`}>
              <Icon icon={currentCollection?.icon || 'mdi:folder'} className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-sm">{currentCollection?.name || 'Design'}</span>
          </div>
        )}

        {/* Tag Selection with Flag Toggle */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setTag(tag === 'Today' ? '' : 'Today')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              tag === 'Today' ? 'bg-green-500 text-white' : 'bg-[#2A3232] text-white'
            }`}
          >
            Today
          </button>
          <button onClick={handleFlagToggle} className="p-1">
            <Icon
              icon="mdi:flag"
              className={`w-5 h-5 ${
                flagColor === 'red' ? 'text-red-500' : flagColor === 'green' ? 'text-green-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Subtasks Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-sm font-semibold">Subtasks</h3>
            <button
              onClick={() => setIsSubTasksExpanded(!isSubTasksExpanded)}
              className="text-gray-400"
            >
              <Icon
                icon={isSubTasksExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'}
                className="w-5 h-5"
              />
            </button>
          </div>
          {isSubTasksExpanded && (
            <div className="flex flex-col gap-2">
              {subTasks.map((subTask) => (
                <div key={subTask.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={subTask.name}
                    onChange={(e) => handleSubTaskChange(subTask.id, e.target.value)}
                    className="bg-[#2A3232] text-white p-2 rounded-lg flex-1 text-sm"
                  />
                  <button
                    onClick={() => handleRemoveSubTask(subTask.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Icon icon="mdi:close" className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddSubTask}
                className="text-pink-500 hover:text-pink-400 text-sm"
              >
                + Add Subtask
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-gradient-start to-gradient-end text-white px-4 py-2 rounded-lg hover:from-gradient-start-hover hover:to-gradient-end-hover transition flex-1"
          >
            {task ? 'Save' : 'Add Task'}
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