import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Task } from '../../types/task';
// import { useAppDispatch } from '../../hooks/useAppDispatch';

import { toggleTaskCompletion } from '../../store/slices/tasksSlice';
import { useAppDispatch } from '../../store/hooks';

interface TaskItemProps {
  task: Task;
  onDoubleClick: () => void;
  onLongPress: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDoubleClick, onLongPress }) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  // Tag background color based on the tag value
  const tagColor = task.tag === 'Today' ? 'bg-orange-500' : task.tag === 'Thursday' ? 'bg-green-500' : 'bg-gray-500';

  return (
    <div className="flex flex-col gap-2">
      {/* Main Task */}
      <div
        className="bg-theme-card/50 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
        onDoubleClick={onDoubleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          onLongPress();
        }}
      >
        <button onClick={handleToggle}>
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              task.completed ? 'bg-theme-accent' : 'border-theme-text/30'
            } flex items-center justify-center`}
          >
            {task.completed && <Icon icon="mdi:check" className="w-3 h-3 text-white" />}
          </div>
        </button>
        <p
          className={`text-theme-text text-sm flex-1 ${
            task.completed ? 'line-through text-theme-text/50' : ''
          }`}
        >
            <div className="flex-1 flex-col justify-start items-center gap-2">
          <p> {task.name}</p> 
          {task.tag && (
          <span className={`text-white text-xs px-2 py-1 rounded ${tagColor}`}>
            {task.tag}
          </span>
        )} 
            </div>
   
        </p>
      
        {task.subTasks && task.subTasks.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <Icon
              icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'}
              className="w-5 h-5 text-theme-text/50"
            />
          </button>
        )}
      </div>

      {/* Nested Tasks */}
      {isExpanded && task.subTasks && task.subTasks.length > 0 && (
        <div className="ml-8 flex flex-col gap-2">
          {task.subTasks.map((subTask) => (
            <div
              key={subTask.id}
              className="bg-theme-card/50 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
              onDoubleClick={onDoubleClick}
              onContextMenu={(e) => {
                e.preventDefault();
                onLongPress();
              }}
            >
              <button onClick={() => dispatch(toggleTaskCompletion(subTask.id))}>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    subTask.completed ? 'bg-theme-accent' : 'border-theme-text/30'
                  } flex items-center justify-center`}
                >
                  {subTask.completed && <Icon icon="mdi:check" className="w-3 h-3 text-white" />}
                </div>
              </button>
              <p
                className={`text-theme-text text-sm flex-1 ${
                  subTask.completed ? 'line-through text-theme-text/50' : ''
                }`}
              >
                {subTask.name}
              </p>
      
            </div>
          ))}
        </div>
      )}
    </div>
  );
};