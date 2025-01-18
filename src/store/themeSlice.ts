import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, ThemeMode } from '../types/theme';

const initialState: ThemeState = {
  current: 'light',
  customColors: undefined
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.current = action.payload;
    },
    setCustomColors: (state, action: PayloadAction<ThemeState['customColors']>) => {
      state.customColors = action.payload;
    }
  }
});

export const { toggleTheme, setTheme, setCustomColors } = themeSlice.actions;
export default themeSlice.reducer; 