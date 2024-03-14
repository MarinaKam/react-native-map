import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';

import { AllPlaces } from '../screens/AllPlaces';
import { AddPlace } from '../screens/AddPlace';
import { Settings } from '../screens/Settings';
import { useGlobalTheme } from '../store';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  const { paletteTheme, palette } = useGlobalTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: palette.main,
        },
        headerTintColor: paletteTheme.text.white,
        contentStyle: {
          backgroundColor: palette.container,
        },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: 'Your Favorite Places',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="plus"
              iconColor={tintColor}
              size={24}
              onPress={() => navigation.navigate('AddPlace')}
            />
          ),
          headerLeft: ({ tintColor }) => (
            <IconButton
              icon="cog-outline"
              iconColor={tintColor}
              size={24}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: 'Add a New Place',
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};