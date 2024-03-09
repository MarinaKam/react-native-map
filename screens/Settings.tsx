import { View, StyleSheet } from 'react-native';
import { Text, ThemeSelect } from '../components';
import { useGlobalTheme } from '../store';

export const Settings = () => {
  const { globalTheme, updateTheme } = useGlobalTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" textAlign="center">You can change a theme color</Text>
      <ThemeSelect defaultValue={globalTheme} onChange={updateTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  }
});
