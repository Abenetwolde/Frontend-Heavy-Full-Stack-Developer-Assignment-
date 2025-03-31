export interface Collection {
    id: number;
    name: string;
    taskCount: number;
    completedTasks: number;
    icon: string; // Icon name for React Iconify (e.g., 'mdi:book')
    color: string; // Tailwind color class for the icon background (e.g., 'bg-pink-500')
  }