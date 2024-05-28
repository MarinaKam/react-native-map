import { FC, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useGlobalTheme } from '../../store';
import { Text } from '../Text';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';

interface PlaceFormInterface {

}
export const PlaceForm: FC<PlaceFormInterface> = () => {
  const { palette, paletteTheme } = useGlobalTheme();
  const [titleVal, setTitleVal] = useState<string>('');

  const handleChangeTitle = (val: string) => {
    setTitleVal(val);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>

        <TextInput
          value={titleVal}
          mode="outlined"
          activeOutlineColor={palette.dark}
          outlineColor={palette.main}
          cursorColor={palette.main}
          textColor={paletteTheme.text.primary}
          style={styles.input}
          outlineStyle={{
            backgroundColor: palette.container,
            borderRadius: paletteTheme.borderRadius,
          }}
          onChangeText={handleChangeTitle}
        />
      </View>

      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    marginBottom: 8,
    height: 50,
    fontSize: 16,
  },
});
