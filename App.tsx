import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StackNavigation } from './navigation';
import { GlobalThemeProvider } from './store';
import { theme } from './theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />

      <GlobalThemeProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </GlobalThemeProvider>
    </PaperProvider>
  );
}
