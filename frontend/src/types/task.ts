export interface Task {
    id: number;
    name: string;
    completed: boolean;
    tag?: string;
    collection_id: number;
    subTasks?: Task[];
  }