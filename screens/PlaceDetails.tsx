import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from '../components';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { useEffect } from 'react';

type NavProp = NavigationProp<RootStackParamList, 'MapScreen'>;
type AddPlaceRoute = RouteProp<RootStackParamList, 'PlaceDetails'>;

export const PlaceDetails = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<AddPlaceRoute>();
  const placeId = route.params.placeId;

  const place = {
    imageUri: 'https://example.com/image.jpg',
  };

  const showMapHandler = () => {
    navigation.navigate('MapScreen');
  };

  useEffect(() => {

  }, [placeId]);

  return (
    <ScrollView>
      <Image source={{ uri: place?.imageUri }} style={styles.image} />

      <View style={styles.locationContainer}>
        <View style={styles.infoContainer}>
          <Text textAlign="center">ADDRESS</Text>
        </View>

        <Button mode="outlined" icon="map" onPress={showMapHandler} style={styles.button}>
          Take Image
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '35%',
    minHeight: 300,
    width: '100%',
    borderRadius: 8,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  infoContainer: {
    padding: 20,
  },
});
