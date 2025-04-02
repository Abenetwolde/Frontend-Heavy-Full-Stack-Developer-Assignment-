import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import { collections } from '../../data/dummyData';
import { useNavigate } from 'react-router-dom';

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task, subtasks?: { title: string }[]) => void;
  task?: Task;
  collectionId: number;
  fromNavbar?: boolean;
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
  const [title, setTitle] = useState(task?.title || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [date, setDate] = useState<Date>(task?.date || new Date());
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(
    task?.collectionId || collectionId
  );
  const [subTasks, setSubTasks] = useState<{ title: string; completed?: boolean }[]>(
    task?.subTasks?.map(st => ({ title: st.title, completed: st.completed })) || []
  );
  const [isSubTasksExpanded, setIsSubTasksExpanded] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
      setDate(task.date);
      setSelectedCollectionId(task.collectionId);
      setSubTasks(task.subTasks?.map(st => ({ title: st.title, completed: st.completed })) || []);
    } else {
      setTitle('');
      setCompleted(false);
      setDate(new Date());
      setSelectedCollectionId(collectionId);
      setSubTasks([]);
    }
  }, [task, collectionId]);

  const handleAddSubTask = () => {
    setSubTasks([
      ...subTasks,
      { title: '', completed: false }
    ]);
    setIsSubTasksExpanded(true);
  };

  const handleRemoveSubTask = (index: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  const handleSubTaskChange = (index: number, newTitle: string) => {
    setSubTasks(
      subTasks.map((subTask, i) =>
        i === index ? { ...subTask, title: newTitle } : subTask
      )
    );
  };

  const handleSave = () => {
    const updatedTask: Task = {
      id: task?.id || undefined,
      title,
      completed,
      date,
      collectionId: selectedCollectionId,
      subTasks: subTasks.map((st, i) => ({
        id: task?.subTasks?.[i]?.id || undefined,
        title: st.title,
        completed: st.completed || false,
        taskId: task?.id || undefined
      }))
    };
    
    // Pass both the task and subtasks to the onSave handler
    onSave(updatedTask, subTasks);
    onClose();
    
    if (fromNavbar) {
      navigate(`/collections/${selectedCollectionId}`);
    }
  };

  const currentCollection = collections.find((col) => col.id === selectedCollectionId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:items-center lg:justify-center">
      <div className="bg-theme-card rounded-t-lg lg:rounded-lg p-6 w-full max-w-md flex flex-col gap-4 absolute bottom-0 lg:bottom-auto lg:top-auto lg:max-w-lg">
        {/* Task Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="bg-[#2A3232] text-white p-3 rounded-lg text-sm placeholder-gray-400"
        />

        {/* Date Input */}
        {/* <input
          type="datetime-local"
          value={date?.toISOString().slice(0, 16)}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="bg-[#2A3232] text-white p-3 rounded-lg text-sm"
        /> */}

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
              {subTasks.map((subTask, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={subTask.title}
                    onChange={(e) => handleSubTaskChange(index, e.target.value)}
                    className="bg-[#2A3232] text-white p-2 rounded-lg flex-1 text-sm"
                  />
                  <button
                    onClick={() => handleRemoveSubTask(index)}
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