import { FC, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import { useGlobalTheme, useMap } from '../../store';
import { Text } from '../Text';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { Button } from '../Button';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';

interface PlaceFormInterface {}

export const PlaceForm: FC<PlaceFormInterface> = () => {
  const { palette, paletteTheme } = useGlobalTheme();
  const { pins } = useMap();
  const [titleVal, setTitleVal] = useState<string>('');
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

  const handleChangeTitle = (val: string) => {
    setTitleVal(val);
  };

  const handleSave = () => {
    console.log('pins', pins)
    console.log('pickedImage', pickedImage)
  };

  return (
    <View style={styles.container}>
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

        <ImagePicker pickedImage={pickedImage} setPickedImage={setPickedImage} />
        <LocationPicker />
      </ScrollView>

      <View style={styles.emptyWrapper} />

      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        style={styles.submitWrapper}
      >
        <Button
          mode="contained"
          style={styles.submitButton}
          onPress={handleSave}
        >
          Add Place
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    marginBottom: 8,
    height: 50,
    fontSize: 16,
  },
  submitWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWrapper: {
    height: 70,
  },
  submitButton: {
    marginTop: 10,
    width: '100%',
  }
});
