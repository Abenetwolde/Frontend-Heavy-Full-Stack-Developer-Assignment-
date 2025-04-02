export interface Collection {
  id?: number; // Make optional
  name: string;
  icon: string;
  color?: string; // Make optional
  taskCount?: number;
  completedTasks?: number;
}