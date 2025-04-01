import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/task';


// Initial dummy data for tasks
const initialState: Task[] = [
  {
    id: 1,
    name: 'Finish the essay collaboration',
    completed: false,
    tag: 'Today',
    collection_id: 1, // School
    subTasks: [
      { id: 11, name: 'Send collaboration files to Jerusha', completed: false, collection_id: 1 },
      { id: 12, name: 'Finish the essay collaboration', completed: false, tag: 'Thursday', collection_id: 1 },
    ],
  },
  {
    id: 2,
    name: 'Read next chapter of the book in Danish',
    completed: false,
    collection_id: 1, // School
  },
  {
    id: 3,
    name: 'Do the math for next monday',
    completed: false,
    tag: 'Monday',
    collection_id: 1, // School
  },
  {
    id: 4,
    name: 'Prepare presentation for history class',
    completed: true,
    collection_id: 1, // School
  },
  {
    id: 5,
    name: 'Complete science project',
    completed: true,
    collection_id: 1, // School
  },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      // If the parent task is completed, mark all subtasks as completed
      if (action.payload.completed && action.payload.subTasks) {
        action.payload.subTasks = action.payload.subTasks.map((subTask) => ({
          ...subTask,
          completed: true,
        }));
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed && task.subTasks) {
          task.subTasks = task.subTasks.map((subTask) => ({
            ...subTask,
            completed: true,
          }));
        }
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;