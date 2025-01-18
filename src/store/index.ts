import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './themeSlice';
import todoReducer from './todoSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'todo']
};

const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    todo: persistedTodoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 