import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useGetCollectionsQuery } from '../api/endpoints/collections';
import { useAddSubtaskMutation, useAddTaskMutation, useDeleteTaskMutation, useGetTasksByCollectionIdQuery, useGetTasksQuery, useUpdateTaskMutation } from '../api/endpoints/tasks';

export const CollectionTasks: React.FC = () => {
  const navigate = useNavigate();
  const { collectionName } = useParams<{ collectionName: string }>();

  const { data: collections, isLoading: isCollectionsLoading } = useGetCollectionsQuery();
  const collection = collections?.find(
    (c) => c.name.toLowerCase() === collectionName?.toLowerCase()
  );
  const collectionId = collection?.id;

  const {
    data: tasks,
    isLoading: isTasksLoading,
    error,
  } = useGetTasksByCollectionIdQuery(collectionId!, {
    skip: !collectionId,
    pollingInterval: 30000,
  });

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [addSubtask] = useAddSubtaskMutation();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<number | undefined>(undefined);

  const activeTasks = tasks?.filter((task) => !task.completed) || [];
  const completedTasks = tasks?.filter((task) => task.completed) || [];

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

  const handleSaveTask = async (task: Task, subtasks?: { title: string }[]) => {
    try {
      if (selectedTask) {
        // Update existing task
        await updateTask({ id: task.id, data: task }).unwrap();
        
        // Handle subtasks updates would go here (you might need additional logic)
      } else {
        // Create new task
        const newTask = await addTask({
          title: task.title,
          date: task.date,
          collectionId: task.collectionId,
          completed: task.completed
        }).unwrap();
        
        // Create subtasks if they exist
        if (subtasks && subtasks.length > 0) {
          await Promise.all(
            subtasks.map(subtask => 
              addSubtask({
                title: subtask.title,
                taskId: newTask.id,
                completed: false
              }).unwrap()
            )
          );
        }
      }
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete).unwrap();
      setIsDeleteDialogOpen(false);
      setTaskToDelete(undefined);
    }
  };

  if (isCollectionsLoading || (collectionId && isTasksLoading)) {
    return <div>Loading...</div>;
  }

  if (error || !collection) {
    return <div>Error loading tasks or collection not found: {(error as any)?.message}</div>;
  }

  return (
    <MainLayout activeTab="collections" hideSidebar={true}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="bg-theme-card w-full lg:w-64 p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-theme-text text-xl font-semibold">Collections</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {collections?.map((col) => (
              <button
                key={col.id}
                onClick={() => navigate(`/collections/${col.name.toLowerCase()}`)}
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  col.name.toLowerCase() === collectionName?.toLowerCase()
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text hover:bg-opacity-80'
                }`}
              >
                <div className={`${col.color} rounded-full p-1.5`}>
                  <Icon icon={col.icon} className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{col.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-4 lg:p-6 bg-theme-bg">
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/collections')} className="text-theme-text">
                <Icon icon="mdi:chevron-left" className="w-6 h-6" />
              </button>
              <h1 className="text-theme-text text-2xl font-semibold">{collection.name}</h1>
              <button className="ml-auto text-theme-text/50 hover:text-theme-text transition">
                <Icon icon="mdi:dots-horizontal" className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 bg-theme-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition w-fit"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              <span>Add a task</span>
            </button>

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

        <AddEditTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
        collectionId={collectionId}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      </div>
    </MainLayout>
  );
};