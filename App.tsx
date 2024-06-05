import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { enableScreens } from 'react-native-screens';
import { StackNavigation } from './navigation';
import { GlobalThemeProvider, MapProvider } from './store';
import { theme } from './theme';
import { useCallback, useEffect, useState } from 'react';
import { init } from './db';
import { View } from 'react-native';
enableScreens();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((err) => console.log(err));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setDbInitialized`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />

        <GlobalThemeProvider>
          <MapProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </MapProvider>
        </GlobalThemeProvider>
      </PaperProvider>
    </View>
  );
}
