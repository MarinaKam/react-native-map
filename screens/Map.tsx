import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL, { Location, UserTrackingMode } from '@rnmapbox/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../components';
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

export const Map: FC<{ pins?: Pin[] }> = ({ pins = [] }) => {
  const [location, setLocation] = useState<Location>();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [mapPins, setMapPins] = useState<Pin[]>(pins);

  const handlePinSelect = (pin: Pin) => {
    setSelectedPin(pin);
  };

  const onUserLocationUpdate = (newLocation: Location) => {
    setLocation(newLocation);
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

    setMapPins([...mapPins, newPin]);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={process.env.MAPBOX_STYLE_URL}
          onTouchStart={handleMapInteraction}
          onPress={handleMapPress}
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

          {[...mapPins, ...pins]?.map((pin, index) => (
            <MapboxGL.PointAnnotation
              id={String(index)}
              key={index.toString()}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={[pin.longitude, pin.latitude]}
              onSelected={() => handlePinSelect(pin)}
            >
              <MaterialIcons name="location-pin" size={30} color="red" />
            </MapboxGL.PointAnnotation>
          ))}

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1
  }
});
