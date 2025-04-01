import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { collections } from '../../data/dummyData';

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  collectionId: number;
}

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  collectionId,
}) => {
  const [name, setName] = useState(task?.name || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [tag, setTag] = useState(task?.tag || '');
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(
    task?.collection_id || collectionId
  );
  const [subTasks, setSubTasks] = useState<Task[]>(task?.subTasks || []);
  const [isSubTasksExpanded, setIsSubTasksExpanded] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setCompleted(task.completed);
      setTag(task.tag || '');
      setSelectedCollectionId(task.collection_id);
      setSubTasks(task.subTasks || []);
    } else {
      setName('');
      setCompleted(false);
      setTag('');
      setSelectedCollectionId(collectionId);
      setSubTasks([]);
    }
  }, [task, collectionId]);

  const handleAddSubTask = () => {
    setSubTasks([
      ...subTasks,
      {
        id: Date.now(), // Temporary ID for new subtasks
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

  const handleSave = () => {
    const updatedTask: Task = {
      id: task?.id || Date.now(), // Temporary ID for new tasks
      name,
      completed,
      tag: tag || undefined,
      collection_id: selectedCollectionId,
      subTasks,
    };
    onSave(updatedTask);
    onClose();
  };

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
          className="bg-theme-bg text-theme-text p-3 rounded-lg text-sm"
        />

        {/* Collection Selection */}
        <div className="flex flex-col gap-2">
          <h3 className="text-theme-text text-sm font-semibold">Collection</h3>
          <div className="flex gap-2 flex-wrap">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollectionId(collection.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                  selectedCollectionId === collection.id
                    ? 'bg-theme-accent text-white'
                    : 'bg-theme-bg text-theme-text'
                }`}
              >
                <div className={`${collection.color} rounded-full p-1`}>
                  <Icon icon={collection.icon} className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{collection.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tag Selection */}
        <div className="flex flex-col gap-2">
          <h3 className="text-theme-text text-sm font-semibold">Tag</h3>
          <div className="flex gap-2">
            {['Today', 'Monday', 'Thursday'].map((tagOption) => (
              <button
                key={tagOption}
                onClick={() => setTag(tagOption === tag ? '' : tagOption)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  tag === tagOption
                    ? tagOption === 'Today'
                      ? 'bg-green-500 text-white'
                      : tagOption === 'Monday'
                      ? 'bg-blue-500 text-white'
                      : 'bg-orange-500 text-white'
                    : 'bg-theme-bg text-theme-text'
                }`}
              >
                {tagOption}
              </button>
            ))}
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-theme-text text-sm font-semibold">Subtasks</h3>
            <button
              onClick={() => setIsSubTasksExpanded(!isSubTasksExpanded)}
              className="text-theme-text/50"
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
                    className="bg-theme-bg text-theme-text p-2 rounded-lg flex-1 text-sm"
                  />
                  <button
                    onClick={() => handleRemoveSubTask(subTask.id)}
                    className="text-theme-text/50 hover:text-theme-text"
                  >
                    <Icon icon="mdi:close" className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddSubTask}
                className="text-theme-accent hover:text-theme-accent/80 text-sm"
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
            className="bg-theme-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition flex-1"
          >
            {task ? 'Save' : 'Add Task'}
          </button>
          <button
            onClick={onClose}
            className="bg-theme-bg text-theme-text px-4 py-2 rounded-lg hover:bg-opacity-80 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};