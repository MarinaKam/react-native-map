import { FC, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { LocationObject } from 'expo-location/src/Location.types';

import { Map } from '../../screens/Map';
import { Button } from '../Button';

export const LocationPicker: FC = () => {
  const navigation = useNavigation();
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  const [location, setLocation] = useState<LocationObject | null>(null);

  console.log(location);
  const verifyPermission = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();

      return permissionRes.granted;
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.');

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setLocation(location);
  };

  const pickOnMapHandler = () => {
    // @ts-ignore
    navigation.navigate('Map');
  };

  return (
    <View>
      <View style={styles.mapContainer}>
        <Map pins={!location ? [] : [location?.coords]} />
      </View>

      <View style={styles.buttonsGroup}>
        <Button style={styles.button} icon="map-marker-radius" onPress={getLocationHandler}>
          Locate the User
        </Button>

        <Button style={styles.button} icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
  },
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  button: {
    width: '48%',
  },
});
