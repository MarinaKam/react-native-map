import { FC } from 'react';
import Mapbox from '@rnmapbox/maps';
import { View, StyleSheet } from 'react-native';

Mapbox.setAccessToken(`${process.env.MAPBOX_PUBLIC_API_KEY}`);

export const Map: FC = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={process.env.MAPBOX_STYLE_URL}
        />
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
    height: 300,
    width: '100%',
  },
  map: {
    flex: 1
  }
});
