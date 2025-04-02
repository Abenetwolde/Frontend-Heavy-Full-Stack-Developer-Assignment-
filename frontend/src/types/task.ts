// src/types/task.ts
export interface Task {
    id: number;
    title: string;
    date: string; // ISO string from API
    completed: boolean;
    collectionId: number;
    subtasks: Subtask[];
  }
  
  export interface Subtask {
    id: number;
    title: string;
    completed: boolean;
    taskId: number;
  }