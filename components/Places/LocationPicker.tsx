import { FC, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import { Pin, useMap, useGlobalTheme } from '../../store';
import { Button } from '../Button';
import { Text } from '../Text';
import { Map } from '../Map';
import { reverseGeocoding } from '../../utils';

export const LocationPicker: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  const { pins, updatePins } = useMap();
  const { paletteTheme } = useGlobalTheme();

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

    try {
      const response = await reverseGeocoding(location?.coords);

      if (response) {
        const { address = null } = response;

        updatePins({
          ...location?.coords,
          location: location?.coords,
          address
        });
      } else {
        Alert.alert('Error', 'Failed to fetch address!');
        console.error('reverseGeocoding returned undefined');
      }
    } catch(error) {
      console.error(`Error with geocoding request: ${error}`);
      Alert.alert('Error', 'Failed to fetch address!');
    }
  };

  const pickOnMapHandler = () => {
    // @ts-ignore
    navigation.navigate('MapScreen');
  };

  useEffect(() => {
    if (isFocused && route?.params) {
      // @ts-ignore
      updatePins(route?.params?.pin as Pin);
    }
  }, [isFocused, route]);

  return (
    <View>
      <View style={[styles.mapContainer, { backgroundColor: paletteTheme.grey[50], borderRadius: paletteTheme.borderRadius }]}>
        {pins?.length > 0 ? (
          <Map />
        ) : (
          <Text>No location picked yet.</Text>
        )}
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  button: {
    width: '48%',
  },
});
