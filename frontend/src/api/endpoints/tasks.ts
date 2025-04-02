// src/store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Collection } from '../../types/collection';
import { Subtask, Task } from '../../types/task';
import { API_BASE_URL } from '../baseApi';


export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Collections', 'Tasks', 'Subtasks'],
  endpoints: (builder) => ({
    // Collections Endpoints
    getCollections: builder.query<Collection[], void>({
      query: () => '/collections/completed-count',
      transformResponse: (response: { success: boolean; data: any[] }) => {
        if (!response.success) throw new Error('Failed to fetch collections');
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
          taskCount: item.totalTasks,
          completedTasks: item.completedTasks,
          icon: item.icon,
          color: mapIconToColor(item.icon),
        }));
      },
      providesTags: ['Collections'],
    }),
    addCollection: builder.mutation<Collection, Partial<Collection>>({
      query: (newCollection) => ({
        url: '/collections',
        method: 'POST',
        body: newCollection,
      }),
      transformResponse: (response: { success: boolean; data: any }) => {
        if (!response.success) throw new Error('Failed to add collection');
        return {
          id: response.data.id,
          name: response.data.name,
          taskCount: 0,
          completedTasks: 0,
          icon: response.data.icon,
          color: mapIconToColor(response.data.icon),
        };
      },
      invalidatesTags: ['Collections'],
    }),

    // Tasks Endpoints
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      transformResponse: (response: { success: boolean; data: Task[] }) => {
        if (!response.success) throw new Error('Failed to fetch tasks');
        return response.data;
      },
      providesTags: ['Tasks'],
    }),
    getTasksByCollectionId: builder.query<Task[], number>({
        query: (collectionId) => `/collection/${collectionId}`,
        transformResponse: (response: { success: boolean; data: Task[] }) => {
          if (!response.success) throw new Error('Failed to fetch tasks');
          return response.data;
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
                { type: 'Tasks', id: 'LIST' },
              ]
            : [{ type: 'Tasks', id: 'LIST' }],
      }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      transformResponse: (response: { success: boolean; data: Task }) => {
        if (!response.success) throw new Error('Failed to add task');
        return response.data;
      },
      invalidatesTags: ['Tasks', 'Collections'],
    }),
    updateTask: builder.mutation<Task, { id: number; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: Task }) => {
        if (!response.success) throw new Error('Failed to update task');
        return response.data;
      },
      invalidatesTags: ['Tasks', 'Collections'],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks', 'Collections'],
    }),

    // Subtasks Endpoints
    getSubtasks: builder.query<Subtask[], void>({
      query: () => '/subtasks',
      transformResponse: (response: { success: boolean; data: Subtask[] }) => {
        if (!response.success) throw new Error('Failed to fetch subtasks');
        return response.data;
      },
      providesTags: ['Subtasks'],
    }),
    addSubtask: builder.mutation<Subtask, Partial<Subtask>>({
      query: (newSubtask) => ({
        url: '/subtasks',
        method: 'POST',
        body: newSubtask,
      }),
      transformResponse: (response: { success: boolean; data:Subtask }) => {
        if (!response.success) throw new Error('Failed to add subtask');
        return response.data;
      },
      invalidatesTags: ['Subtasks', 'Tasks'],
    }),
    updateSubtask: builder.mutation<Subtask, { id: number; data: Partial<Subtask> }>({
      query: ({ id, data }) => ({
        url: `/subtasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: Subtask }) => {
        if (!response.success) throw new Error('Failed to update subtask');
        return response.data;
      },
      invalidatesTags: ['Subtasks', 'Tasks'],
    }),
    deleteSubtask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/subtasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subtasks', 'Tasks'],
    }),
  }),
});

const mapIconToColor = (icon: string): string => {
  const colorMap: { [key: string]: string } = {
    'mdi:school': 'bg-pink-500',
    'mdi:account': 'bg-teal-500',
    'mdi:palette': 'bg-purple-500',
    'mdi:cart': 'bg-yellow-500',
  };
  return colorMap[icon] || 'bg-gray-500';
};

export const {
  useGetCollectionsQuery,
  useAddCollectionMutation,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetSubtasksQuery,
  useAddSubtaskMutation,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
  useGetTasksByCollectionIdQuery,
} = taskApi;