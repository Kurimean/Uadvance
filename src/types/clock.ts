export type ClockType = 'digital' | 'analog' | 'minimal';
export type ClockSize = 'small' | 'medium' | 'large';

export interface ClockTheme {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontSize?: string;
}

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  ampm: string;
  timezone: string;
} 