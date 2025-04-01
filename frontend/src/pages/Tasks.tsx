import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collections } from '../data/dummyData';
import { TaskItem } from '../components/tasks/TaskItem';
import { MainLayout } from '../layouts/MainLayout';
// import { AddEditTaskModal } from '../components/tasks/AddEditTaskModal'; // Updated import

import { DeleteConfirmationDialog } from '../components/tasks/DeleteConfirmationDialog';
// import { useAppSelector, useAppDispatch } from '../hooks/store';
useAppSelector
import { addTask, editTask, deleteTask } from '../store/slices/tasksSlice';
import { AddEditTaskModal } from '../components/tasks/AddEditTaskModal';
import { useAppSelector ,useAppDispatch} from '../store/hooks';
import { Task } from '../types/task';

export const SchoolTasks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);

  // Filter tasks for the "School" collection (collection_id: 1)
  const schoolTasks = tasks.filter((task) => task.collection_id === 1);
  const activeTasks = schoolTasks.filter((task) => !task.completed);
  const completedTasks = schoolTasks.filter((task) => task.completed);

  // State for dialogs
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<number | undefined>(undefined);

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setIsDeleteDialogOpen(false);
      setTaskToDelete(undefined);
    }
  };

  return (
    <MainLayout activeTab="collections" hideSidebar={true}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Separate Sidebar for Collections */}
        <div className="bg-theme-card w-full lg:w-64 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => navigate(`/collections/${collection.name.toLowerCase()}`)}
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  collection.name === 'School'
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <div className={`${collection.color} rounded-full p-1.5`}>
                  <Icon icon={collection.icon} className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{collection.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 bg-theme-bg">
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            {/* Header with Back Button and Title */}
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/collections')} className="text-theme-text">
                <Icon icon="mdi:chevron-left" className="w-6 h-6" />
              </button>
              <h1 className="text-theme-text text-2xl font-semibold">School</h1>
              <button className="ml-auto text-theme-text/50 hover:text-theme-text transition">
                <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
              </button>
            </div>

            {/* Add Task Button */}
            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 bg-theme-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition w-fit"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              <span>Add a task</span>
            </button>

            {/* Tasks Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-theme-text text-lg font-semibold">
                Tasks - {activeTasks.length}
              </h2>
              <div className="flex flex-col gap-3">
                {activeTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDoubleClick={() => handleEditTask(task)}
                    onLongPress={() => handleDeleteTask(task.id)}
                  />
                ))}
              </div>
            </div>

            {/* Completed Section */}
            {completedTasks.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-theme-text text-lg font-semibold">
                  Completed - {completedTasks.length}
                </h2>
                <div className="flex flex-col gap-3">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDoubleClick={() => handleEditTask(task)}
                      onLongPress={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task Modal */}
        <AddEditTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
          task={selectedTask}
          collectionId={1} // School collection ID
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </MainLayout>
  );
};