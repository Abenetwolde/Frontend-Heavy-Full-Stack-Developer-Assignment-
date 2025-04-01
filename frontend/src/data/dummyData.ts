import { Collection } from '../types/collection';

export const collections: Collection[] = [
  {
    id: 1,
    name: 'School',
    taskCount: 8,
    completedTasks: 4,
    icon: 'mdi:book',
    color: 'bg-pink-500',
  },
  {
    id: 2,
    name: 'Personal',
    taskCount: 5,
    completedTasks: 3,
    icon: 'mdi:account',
    color: 'bg-teal-500',
  },
  {
    id: 3,
    name: 'Design',
    taskCount: 15,
    completedTasks: 15,
    icon: 'mdi:pencil',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    name: 'Groceries',
    taskCount: 10,
    completedTasks: 2,
    icon: 'mdi:cart',
    color: 'bg-yellow-500',
  },
];

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  tag?: string;
  subTasks?: Task[];
}

export const schoolTasks: Task[] = [
  {
    id: 1,
    name: 'Finish the essay collaboration',
    completed: false,
    tag: 'Today',
    subTasks: [
      { id: 11, name: 'Send collaboration files to Jerusha', completed: false },
      { id: 12, name: 'Finish the essay collaboration', completed: false, tag: 'Thursday' },
    ],
  },
  {
    id: 2,
    name: 'Read next chapter of the book in Danish',
    completed: false,
  },
  {
    id: 3,
    name: 'Do the math for next monday',
    completed: false,
    tag: 'Monday',
  },
  {
    id: 4,
    name: 'Prepare presentation for history class',
    completed: true,
  },
  {
    id: 5,
    name: 'Complete science project',
    completed: true,
  },
];