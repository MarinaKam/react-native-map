import { FC, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, StyleSheet, Animated, Alert } from 'react-native';
import MapboxGL, { UserTrackingMode } from '@rnmapbox/maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../components';
import { useGlobalTheme } from '../store';
import { useMap } from '../store/MapProvider';
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


interface Pin {
  latitude: number;
  longitude: number;
}

export const Map: FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pins, deletePin, onUserLocationUpdate } = useMap();
  const [mapPin, setMapPin] = useState<Pin | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const { paletteTheme } = useGlobalTheme();
  const [isMapReady, setMapReady] = useState(false);
  const [opacityAnimation] = useState(new Animated.Value(0));

  const handlePinSelect = (pin: Pin) => {
    setSelectedPin(pin);
  };

  const handleMapInteraction = () => {
    setSelectedPin(null);
  };

  const handleMapPress = (event: any) => {
    const {geometry: {coordinates}} = event;
    const newPin: Pin = {
      latitude: coordinates[1],
      longitude: coordinates[0]
    }

    setMapPin(newPin);
  };

  const handleDeleteLastPin = () => {
    deletePin();
    setSelectedPin(null);
  };

  const savePickedLocation = useCallback(() => {
    if (!mapPin) {
      Alert.alert('No location picked!', 'You have to pick a location (by tapping on the map) first!');
      return;
    }

    setMapPin(null);
    setMapReady(false);
    // @ts-ignore
    navigation.navigate('AddPlace', { pin: mapPin });
  }, [navigation, mapPin]);

  useLayoutEffect(() => {
    if (route.name === 'Map') {
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
    }
  }, [route.name, navigation, savePickedLocation]);

  useEffect(() => {
    setTimeout(() => setMapReady(true), 700);
  }, [route?.name]);

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: isMapReady ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isMapReady, route?.name]);

  return (
    <View style={[styles.page, !isMapReady && { backgroundColor: paletteTheme.grey[50] }]}>
      <Animated.View style={[styles.container, { opacity: opacityAnimation }]}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={process.env.MAPBOX_STYLE_URL}
          onTouchStart={handleMapInteraction}
          onPress={route.name === 'Map' ? handleMapPress : undefined}
          // onLongPress={route.name === 'Map' ? handleMapPress : undefined}
        >
          <MapboxGL.UserLocation
            onUpdate={onUserLocationUpdate}
          />

          <MapboxGL.Camera
            followZoomLevel={16}
            followUserLocation
            followUserMode={UserTrackingMode.Follow}
          />

          {/*<MapboxGL.ShapeSource id="bounds" shape={polygon}>*/}
          {/*  <MapboxGL.FillLayer id="boundsFill" style={boundsStyle} />*/}
          {/*</MapboxGL.ShapeSource>*/}

          {pins?.map((pin, index) => (
            <MapboxGL.PointAnnotation
              id={String(index)}
              key={index.toString()}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={[pin.longitude, pin.latitude]}
              onSelected={() => handlePinSelect(pin)}
            >
              <View>
                <MaterialIcons name="location-pin" size={30} color="red" />
              </View>
            </MapboxGL.PointAnnotation>
          ))}

          {!!mapPin && (
            <MapboxGL.PointAnnotation
              id="userLocation"
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={[mapPin.longitude, mapPin.latitude]}
              onSelected={() => handlePinSelect(mapPin)}
            >
              <View>
                <MaterialIcons name="location-pin" size={30} color="blue" />
              </View>
            </MapboxGL.PointAnnotation>
          )}

          {!!selectedPin && (
            <MapboxGL.MarkerView
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
            </MapboxGL.MarkerView>
          )}
        </MapboxGL.MapView>
      </Animated.View>

      {!!pins?.length && (
        <IconButton
          animated
          mode="contained"
          icon="delete-outline"
          size={30}
          style={[
            styles.deleteButton,
            {
              bottom: route.name === 'Map' ? 35 : 0,
              right: route.name === 'Map' ? 10 : 0,
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
