import { FC, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { launchImageLibraryAsync, useCameraPermissions, PermissionStatus, MediaTypeOptions } from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { Text } from '../Text';
import { useGlobalTheme } from '../../store';
import { Button } from '../Button';

export const ImagePicker: FC = () => {
  const { paletteTheme } = useGlobalTheme();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

  const verifyPermission = async () => {
    if (cameraPermissionInfo && cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();

      return permissionRes.granted;
    }

    if (cameraPermissionInfo && cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    // TODO: this one doesn't work on ios emulator
    // const image = await launchCameraAsync({
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1, // set to 0.5 if use camera and real device
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imagePreview, { backgroundColor: paletteTheme.grey[50], borderRadius: paletteTheme.borderRadius }]}>
        {!pickedImage?.uri ? (
          <Text>No image taken yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage?.uri }} />
        )}
      </View>

      <Button mode="outlined" icon="camera" onPress={takeImageHandler}>
        Take Image
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
