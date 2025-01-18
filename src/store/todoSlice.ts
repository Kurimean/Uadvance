import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types/todo';
import { v4 as uuidv4 } from 'uuid';

const initialState: TodoState = {
  items: [],
  categories: ['工作', '生活', '学习'],
  tags: [],
  filter: {}
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt'>>) => {
      state.items.push({
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date(),
      });
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo> & { id: string }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload;
    }
  }
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  addCategory,
  addTag,
  setFilter
} = todoSlice.actions;

export default todoSlice.reducer; 