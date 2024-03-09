import { MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/src/types';

export enum ThemeColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export const themeColor: ThemeColor = ThemeColor.Primary;

export type PaletteColorType = {
  main: string;
  light: string;
  dark: string;
  container: string;
};

export type PaletteTextType = {
  primary: string;
  secondary: string;
  disabled: string;
  white: string;
};

type PaletteColors = {
  [key in ThemeColor]: PaletteColorType;
};

export type Theme = MD3Theme & {
  palette: {
    borderRadius: number;
    text: PaletteTextType;
    grey: {
      [key: number]: string;
    };
  } & PaletteColors;
};

export const theme: Theme = {
  ...MD3LightTheme,
  roundness: 2,
  ...MD3LightTheme.colors,
  palette: {
    borderRadius: 8,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      white: '#ffffff',
    },
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      container: '#fff',
      // container: '#e3f2fd',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      container: '#fff',
      // container: '#e8f5e9',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      container: '#fff',
      // container: '#fff3e0'
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      container: '#fff',
      // container: '#ffebee',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      container: '#fff',
      // container: '#f3e5f5',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      container: '#fff',
      // container: '#e1f5fe'
    },
    grey: {
      50: '#eceff1',
      100: '#cfd8dc',
      200: '#b0bec5',
      300: '#90a4ae',
      400: '#78909c',
      500: '#607d8b',
      600: '#546e7a',
      700: '#455a64',
      800: '#37474f',
      900: '#263238',
    },
  },
};
