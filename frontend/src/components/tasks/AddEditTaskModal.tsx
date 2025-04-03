import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import { collections } from '../../data/dummyData';
import { useNavigate } from 'react-router-dom';
import { useAddTaskMutation, useUpdateTaskMutation, useAddSubtaskMutation, useUpdateSubtaskMutation } from '../../api/endpoints/tasks';

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any, subtasks?: { title: string }[]) => void;
  task?: any;
  collectionId: any;
  fromNavbar?: boolean;
}

const mapIconToColor = (icon: string): string => {
  const colorMap: { [key: string]: string } = {
    'mdi:school': 'bg-pink-500',
    'mdi:account': 'bg-teal-500',
    'mdi:palette': 'bg-purple-500',
    'mdi:cart': 'bg-yellow-500',
  };
  return colorMap[icon] || 'bg-gray-500';
};

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  collectionId,
  fromNavbar = false,
}) => {
 // Log the task prop
  const navigate = useNavigate();
  const [title, setTitle] = useState(task?.title || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [date, setDate] = useState<any>(task?.date || new Date());
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(
    task?.collectionId || collectionId
  );
  const [subTasks, setSubTasks] = useState<{ id?: number; title: string; completed?: boolean }[]>(
    task?.subtasks?.map((st:any) => ({ id: st.id, title: st.title, completed: st.completed })) || []
  );
  const [isSubTasksExpanded, setIsSubTasksExpanded] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('Today');
  const [isFlagged, setIsFlagged] = useState<boolean>(false);

  // API Mutations
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [addSubtask] = useAddSubtaskMutation();
  const [updateSubtask] = useUpdateSubtaskMutation();

  useEffect(() => {
    console.log('Task received in modal:', task);
    console.log('Initial subTasks state:', subTasks);
    if (task) {
      setTitle(task.title || '');
      setCompleted(task.completed || false);
      setDate(task.date || new Date());
      setSelectedCollectionId(task.collectionId || collectionId);
      const newSubTasks = task.subtasks?.map((st:any) => ({
        id: st.id,
        title: st.title || '',
        completed: st.completed || false,
      })) || [];
      setSubTasks(newSubTasks);
      console.log('SubTasks set in useEffect:', newSubTasks);
    } else {
      setTitle('');
      setCompleted(false);
      setDate(new Date());
      setSelectedCollectionId(collectionId);
      setSubTasks([]);
    }
  }, [task, collectionId]);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { title: '', completed: false }]);
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
  const currentCollection = collections.find((col) => col.id === selectedCollectionId);
  const handleSave = async () => {
    try {
      let savedTask: any;

      if (task) {
        savedTask = await updateTask({
          id: task.id!,
          data: {
            title,
            completed,
            date,
            collectionId: selectedCollectionId,
          },
        }).unwrap();

        if (subTasks && subTasks.length > 0) {
          await Promise.all(
            subTasks.map(async (subtask, index) => {
              if (subtask.id) {
                await updateSubtask({
                  id: subtask.id,
                  data: {
                    title: subtask.title,
                    completed: subtask.completed || false,
                  },
                }).unwrap();
              } else {
                await addSubtask({
                  title: subtask.title,
                  taskId: savedTask.id!,
                  completed: subtask.completed || false,
                }).unwrap();
              }
            })
          );
        }
       await onClose();
        savedTask.subTasks = subTasks.map((st, i) => ({
          id: st.id || task.subTasks?.[i]?.id,
          title: st.title,
          completed: st.completed || false,
          taskId: savedTask.id!,
        }));

      } else {
        savedTask = await addTask({
          title,
          date,
          collectionId: selectedCollectionId,
          completed,
        }).unwrap();

        if (subTasks && subTasks.length > 0) {
          await Promise.all(
            subTasks.map((subtask) =>
              addSubtask({
                title: subtask.title,
                taskId: savedTask.id!,
                completed: subtask.completed || false,
              }).unwrap()
            )
          );
        }
      
       await navigate(`/collections/${currentCollection?.name||'school'}`);
        await onClose();
        savedTask.subTasks = subTasks.map((st) => ({
          id: undefined,
          title: st.title,
          completed: st.completed || false,
          taskId: savedTask.id!,
        }));
      }

      onSave(savedTask, subTasks);
     

      if (fromNavbar) {
        navigate(`/collections/${currentCollection?.name||'school'}`);
      }
    } catch (err) {
      console.error('Failed to save task or subtasks:', err);
    }
  };



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
          className="bg-theme-bg text-theme-text p-3 rounded-lg text-sm placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-theme-accent"
        />
        <h3 className="text-theme-text text-sm font-semibold mb-1">Collection</h3>
        {/* Collection, Calendar, and Flag Row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedCollectionId||1}
                onChange={(e) => setSelectedCollectionId(Number(e.target.value))}
                className="bg-theme-bg text-theme-text p-3 pl-10 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-theme-accent w-full appearance-none"
              >
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id} className="flex items-center">
                    {collection.name}
                  </option>
                ))}
              </select>
              {currentCollection && (
                <div className={`${mapIconToColor(currentCollection.icon)} rounded-full p-1 absolute left-2 top-1/2 transform -translate-y-1/2`}>
                  <Icon icon={currentCollection.icon} className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-theme-bg text-theme-text p-2 pl-8 rounded-lg text-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-theme-accent appearance-none"
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <Icon
              icon="mdi:calendar"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500"
            />
          </div>

          <button
            onClick={() => setIsFlagged(!isFlagged)}
            className="bg-theme-bg p-2 rounded-lg border border-gray-500"
          >
            <Icon
              icon="mdi:flag"
              className={`w-4 h-4 ${isFlagged ? 'text-green-500' : 'text-red-500'}`}
            />
          </button>
        </div>

        {/* Subtasks Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-theme-text text-sm font-semibold">Subtasks</h3>
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
              {subTasks.length > 0 ? (
                subTasks.map((subTask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={subTask.title}
                      onChange={(e) => handleSubTaskChange(index, e.target.value)}
                      className="bg-theme-bg placeholder-gray-400 text-theme-text p-2 rounded-lg flex-1 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-theme-accent"
                    />
                    <button
                      onClick={() => handleRemoveSubTask(index)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon icon="mdi:close" className="w-5 h-5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No subtasks yet</p>
              )}
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
            className="bg-theme-bg text-theme-text px-4 py-2 rounded-lg hover:bg-opacity-80 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};