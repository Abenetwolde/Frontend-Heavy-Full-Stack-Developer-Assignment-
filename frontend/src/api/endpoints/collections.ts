// src/store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Collection } from '../../types/collection';
import { API_BASE_URL } from '../baseApi';

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }), // Adjust port if needed
  tagTypes: ['Collections'],
  endpoints: (builder) => ({
    getCollections: builder.query<Collection[], void>({
      query: () => '/collection/completed-count', // Using the completed-count endpoint
      transformResponse: (response: { success: boolean; data: any[] }) => {
        if (!response.success) throw new Error('Failed to fetch collections');
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
          taskCount: item.totalTasks,
          completedTasks: item.completedTasks,
          icon: item.icon,
          color: mapIconToColor(item.icon), // Map icon to color (see below)
        }));
      },
      providesTags: ['Collections'],
    }),
    addCollection: builder.mutation<Collection, Partial<Collection>>({
      query: (newCollection) => ({
        url: '/collection',
        method: 'POST',
        body: newCollection,
      }),
      transformResponse: (response: { success: boolean; data: any }) => {
        if (!response.success) throw new Error('Failed to add collection');
        return {
          id: response.data.id,
          name: response.data.name,
          taskCount: 0, // New collection starts with 0 tasks
          completedTasks: 0,
          icon: response.data.icon,
          color: mapIconToColor(response.data.icon),
        };
      },
      invalidatesTags: ['Collections'], // Refetch collections after adding
    }),
    deleteCollection: builder.mutation<{ success: boolean }, string>({
        query: (id) => ({
          url: `/collection/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Collections'],
      }),
  }),
  
});

// Helper function to map icons to colors (customize as needed)
const mapIconToColor = (icon: string): string => {
  const colorMap: { [key: string]: string } = {
    'mdi:school': 'bg-pink-500',
    'mdi:account': 'bg-teal-500',
    'mdi:palette': 'bg-purple-500',
    'mdi:cart': 'bg-yellow-500',
  };
  return colorMap[icon] || 'bg-gray-500'; // Default color
};

export const { useGetCollectionsQuery, useAddCollectionMutation ,useDeleteCollectionMutation} = collectionApi;