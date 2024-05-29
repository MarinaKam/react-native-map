import { FC, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapboxGL, { PointAnnotation, UserTrackingMode, Camera, MarkerView, MapView, UserLocation } from '@rnmapbox/maps';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useGlobalTheme, Pin, useMap } from '../../store';
import { reverseGeocoding } from '../../utils';
import { Text } from '../Text';
// import bboxPolygon from '@turf/bbox-polygon';

MapboxGL.setAccessToken(`${process.env.MAPBOX_PUBLIC_API_KEY}`);

// const boundsStyle = {
//   fillColor: 'rgba(255, 255, 255, 0.1)',
//   fillOutlineColor: 'white',
// };

// const bounds = {
//   ne: [-4.265762, 51.054738],
//   sw: [-5.760365, 49.947256],
// };

// const { ne, sw } = bounds;
// const polygon = bboxPolygon([sw[0], sw[1], ne[0], ne[1]]);

interface MapProps {
  mapPin?: Pin | null;
  isMapPage?: boolean;
  setMapPin?: (pin: Pin) => void;
}

export const Map: FC <MapProps> = ({ isMapPage = false, mapPin, setMapPin }) => {
  const pointAnnotation = useRef<PointAnnotation>(null);
  const { pins, deletePin, onUserLocationUpdate } = useMap();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const { paletteTheme } = useGlobalTheme();

  const handlePinSelect = (pin: Pin) => {
    setSelectedPin(pin);
  };

  const handleMapInteraction = () => {
    setSelectedPin(null);
  };

  const handleMapPress = async (event: any) => {
    const { geometry: { coordinates } } = event;
    const newPin: Pin['location'] = {
      latitude: coordinates[1],
      longitude: coordinates[0]
    };

    try {
      const response = await reverseGeocoding(newPin);

      if (response) {
        const { address = null } = response;

        setMapPin?.({
          latitude: newPin.latitude,
          longitude: newPin.longitude,
          location: newPin,
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

  const handleDeleteLastPin = () => {
    deletePin();
    setSelectedPin(null);
  };

  useEffect(() => {
    if (mapPin) {
      pointAnnotation.current?.refresh();
    }
  }, [mapPin]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          styleURL={process.env.MAPBOX_STYLE_URL}
          onTouchStart={handleMapInteraction}
          onPress={isMapPage ? handleMapPress : undefined}
          // onLongPress={route.name === 'MapScreen' ? handleMapPress : undefined}
        >
          <UserLocation onUpdate={onUserLocationUpdate} />

          <Camera
            followZoomLevel={16}
            followUserLocation
            followUserMode={UserTrackingMode.Follow}
          />

          {/*<MapboxGL.ShapeSource id="bounds" shape={polygon}>*/}
          {/*  <MapboxGL.FillLayer id="boundsFill" style={boundsStyle} />*/}
          {/*</MapboxGL.ShapeSource>*/}

          {!mapPin && pins?.map((pin, index) => (
            <PointAnnotation
              id={String(index)}
              key={index.toString()}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={[pin.longitude, pin.latitude]}
              onSelected={() => handlePinSelect(pin)}
            >
              <View>
                <MaterialIcons name="location-pin" size={30} color="red" />
              </View>
            </PointAnnotation>
          ))}

          {!!mapPin?.longitude && (
            <PointAnnotation
              ref={pointAnnotation}
              id="userLocation"
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={[mapPin.longitude, mapPin.latitude]}
              onSelected={() => handlePinSelect(mapPin)}
            >
              <View>
                <MaterialIcons
                  name="location-pin"
                  size={30}
                  color="blue"
                />
              </View>
            </PointAnnotation>
          )}

          {!!selectedPin && (
            <MarkerView
              id="tooltip-view"
              coordinate={[selectedPin.longitude, selectedPin.latitude]}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 13 }}>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Additional information can go here...</Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 15,
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopColor: '#FFF',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}
                />
              </View>
            </MarkerView>
          )}
        </MapView>
      </View>

      {!!pins?.length && (
        <IconButton
          animated
          mode="contained"
          icon="delete-outline"
          size={30}
          style={[
            styles.deleteButton,
            {
              bottom: isMapPage ? 35 : 0,
              right: isMapPage ? 10 : 0,
            }
          ]}
          containerColor={paletteTheme?.error?.main}
          iconColor={paletteTheme?.error?.container}
          onPress={handleDeleteLastPin}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1
  },
  deleteButton: {
    position: 'absolute',
  }
});
