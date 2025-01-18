export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  current: ThemeMode;
  customColors?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
} 