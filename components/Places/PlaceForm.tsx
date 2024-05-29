import { FC, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';

import { Pin, useGlobalTheme, useMap } from '../../store';
import { PlaceType } from '../../models/place';
import { Text } from '../Text';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { Button } from '../Button';

interface PlaceFormInterface {
  onCreatePlace: (val: PlaceType) => void;
}

export const PlaceForm: FC<PlaceFormInterface> = ({ onCreatePlace }) => {
  const { palette, paletteTheme } = useGlobalTheme();
  const { pins } = useMap();
  const [titleVal, setTitleVal] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

  const handleChangeTitle = (val: string) => {
    setTitleError(false);
    setTitleVal(val.trim());
  };

  const handleSave = async () => {
    if (!titleVal) {
      setTitleError(true);
      Alert.alert('No title entered!', 'You have to enter a title of location!');
      return;
    }

    if (!pickedImage) {
      Alert.alert('No image selected!', 'You have to select an image!');
      return;
    }

    if (!pins?.[0]) {
      Alert.alert('No location picked!', 'You have to pick a location!');
      return;
    }

    onCreatePlace({
      address: pins?.[0]?.address,
      location: pins?.[0]?.location,
      title: titleVal,
      imageUri: pickedImage?.uri
    })
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>

          <TextInput
            value={titleVal}
            mode="outlined"
            error={titleError}
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
