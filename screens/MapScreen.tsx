import { FC, useState, useLayoutEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

import { Map } from '../components';
import { Pin } from '../store';

export const MapScreen: FC = () => {
  const navigation = useNavigation();
  const [mapPin, setMapPin] = useState<Pin | null>(null);

  const savePickedLocation = useCallback(() => {
    if (!mapPin) {
      Alert.alert('No location picked!', 'You have to pick a location (by tapping on the map) first!');
      return;
    }

    setMapPin(null);
    // @ts-ignore
    navigation.navigate('AddPlace', { pin: mapPin });
  }, [navigation, mapPin]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // @ts-ignore
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="content-save"
          iconColor={tintColor}
          size={24}
          onPress={savePickedLocation}
        />
      )
    });
  }, [savePickedLocation]);

  return (
    <Map isMapPage mapPin={mapPin} setMapPin={setMapPin} />
  );
};
