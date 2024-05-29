import { FC } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  PermissionStatus,
  MediaTypeOptions,
  launchCameraAsync,
  useCameraPermissions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions
} from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { Text } from '../Text';
import { useGlobalTheme } from '../../store';
import { Button } from '../Button';

interface ImagePickerI {
  pickedImage: ImagePickerAsset | null;
  setPickedImage: (image: ImagePickerAsset | null) => void;
}

export const ImagePicker: FC<ImagePickerI> = ({ pickedImage, setPickedImage }) => {
  const { paletteTheme } = useGlobalTheme();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [libraryPermissionInfo, requestLibraryPermission] = useMediaLibraryPermissions();

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

  const verifyLibraryPermission = async () => {
    if (libraryPermissionInfo && libraryPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestLibraryPermission();
      return permissionRes.granted;
    }

    if (libraryPermissionInfo && libraryPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant media library permissions to use this app.');
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
    const image = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5, // set to 0.5 if use camera and real device
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0]);
    }
  };

  const pickImageHandler = async () => {
    const hasPermission = await verifyLibraryPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
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

      <View style={styles.buttonsGroup}>
        <Button mode="contained" icon="image" onPress={pickImageHandler} style={[ styles.button, { marginRight: 4 } ]}>
          Choose Image
        </Button>

        <Button mode="outlined" icon="camera" onPress={takeImageHandler} style={[ styles.button, { marginLeft: 4 } ]}>
          Take Image
        </Button>
      </View>
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
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  button: {
    flex: 1,
  }
});
