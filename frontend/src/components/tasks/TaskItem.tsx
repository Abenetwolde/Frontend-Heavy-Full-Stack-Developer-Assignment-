// src/components/tasks/TaskItem.tsx
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Task } from '../../types/task';
import { useUpdateSubtaskMutation, useUpdateTaskMutation } from '../../api/endpoints/tasks';
// import { useUpdateTaskMutation, useUpdateSubtaskMutation } from '../../store/api';

interface TaskItemProps {
  task: Task;
  onDoubleClick: () => void;
  onLongPress: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDoubleClick, onLongPress }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [updateSubtask] = useUpdateSubtaskMutation();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleTask = async () => {
    try {
      await updateTask({
        id: task.id,
        data: { completed: !task.completed },
      }).unwrap();
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
    }
  };

  const handleToggleSubtask = async (subtaskId: number, currentCompleted: boolean) => {
    try {
      await updateSubtask({
        id: subtaskId,
        data: { completed: !currentCompleted },
      }).unwrap();
    } catch (err) {
      console.error('Failed to toggle subtask completion:', err);
    }
  };

  // Remove tag logic since it’s not in the backend response yet
  // If you add 'tag' to the backend later, reintroduce this with appropriate mapping
  // const tagColor = task.tag === 'Today' ? 'bg-orange-500' : task.tag === 'Thursday' ? 'bg-green-500' : 'bg-gray-500';

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
        <button onClick={handleToggleTask}>
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              task.completed ? 'bg-theme-accent' : 'border-theme-accent'
            } flex items-center justify-center`}
          >
            {task.completed && <Icon icon="mdi:check" className="w-3 h-3 text-theme-white" />}
          </div>
        </button>
        <p
          className={`text-theme-text text-sm flex-1 ${
            task.completed ? 'line-through text-theme-text/50' : ''
          }`}
        >
          <div className="flex-1 flex-col justify-start items-center gap-2">
            <p>{task.title}</p>
            {/* Reintroduce this if 'tag' is added to the backend */}
            {/* {task.tag && (
              <span className={`text-white text-xs px-2 py-1 rounded ${tagColor}`}>
                {task.tag}
              </span>
            )} */}
          </div>
        </p>

        {task.subtasks && task.subtasks.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <Icon
              icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'}
              className="w-5 h-5 text-theme-text/50"
            />
          </button>
        )}
      </div>

      {/* Nested Subtasks */}
      {isExpanded && task.subtasks && task.subtasks.length > 0 && (
        <div className="ml-8 flex flex-col gap-2">
          {task.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="bg-theme-card/50 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
              onDoubleClick={onDoubleClick} // Adjust if subtask-specific edit is needed
              onContextMenu={(e) => {
                e.preventDefault();
                onLongPress(); // Adjust if subtask-specific delete is needed
              }}
            >
              <button onClick={() => handleToggleSubtask(subtask.id, subtask.completed)}>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    subtask.completed ? 'bg-theme-accent' : 'border-theme-accent'
                  } flex items-center justify-center`}
                >
                  {subtask.completed && <Icon icon="mdi:check" className="w-3 h-3 text-white" />}
                </div>
              </button>
              <p
                className={`text-theme-text text-sm flex-1 ${
                  subtask.completed ? 'line-through text-theme-text/50' : ''
                }`}
              >
                {subtask.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};