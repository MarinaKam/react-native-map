import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'react-native-paper';
import { createContext, useState, useEffect, ReactNode, useContext, useRef } from 'react';
import { PaletteColorType, Theme, ThemeColor, themeColor } from '../../theme';

type GlobalContextType = {
  globalTheme: ThemeColor;
  palette: PaletteColorType;
  paletteTheme: Theme['palette'];
  updateTheme: (val: ThemeColor) => void;
};

type GlobalProviderType = {
  children: ReactNode | ReactNode[];
};

export const GlobalThemeContext = createContext<GlobalContextType>({} as GlobalContextType);

export const GlobalThemeProvider = ({ children }: GlobalProviderType) => {
  const defaultTheme: Theme = useTheme();
  const mounted = useRef(false);
  const [theme, setTheme] = useState<ThemeColor>(themeColor || 'primary');

  const updateTheme = async (val: ThemeColor) => {
    await AsyncStorage.setItem('theme', val);
    setTheme(val);
  };

  useEffect(() => {
    if (!mounted?.current) {
      setTimeout(() => {
        mounted.current = true;
      }, 1000);

      return;
    }

    const getTheme = async () => {
      const storedTheme = await AsyncStorage?.getItem?.('theme');

      if (!storedTheme) {
        await AsyncStorage.setItem('theme', themeColor);
        setTheme(themeColor);
      }

      setTheme(storedTheme as ThemeColor);
    };

    getTheme();
  }, [mounted?.current]);

  const providerValue = {
    globalTheme: theme,
    palette: defaultTheme.palette[theme],
    paletteTheme: defaultTheme.palette,
    updateTheme,
  };
  return <GlobalThemeContext.Provider value={providerValue}>{children}</GlobalThemeContext.Provider>;
};

export const useGlobalTheme = () => useContext(GlobalThemeContext);
