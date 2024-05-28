import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StackNavigation } from './navigation';
import { GlobalThemeProvider } from './store';
import { theme } from './theme';
import { enableScreens } from 'react-native-screens';
import { MapProvider } from './store/MapProvider';
enableScreens();

export default function App() {
  return (
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
  );
}
