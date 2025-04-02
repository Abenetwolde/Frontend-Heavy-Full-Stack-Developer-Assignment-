import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import tasksReducer from './slices/tasksSlice';
import { collectionApi } from '../api/endpoints/collections';
import { taskApi } from '../api/endpoints/tasks';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: tasksReducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collectionApi.middleware, taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;