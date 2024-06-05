import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationProp, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Button, Text } from '../components';
import { useGlobalTheme } from '../store';
import { Place } from '../models/place';
import { getPlace } from '../db';

type NavProp = NavigationProp<RootStackParamList, 'MapScreen'>;
type AddPlaceRoute = RouteProp<RootStackParamList, 'PlaceDetails'>;

export const PlaceDetails = () => {
  const isFocused = useIsFocused();
  const { palette } = useGlobalTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<AddPlaceRoute>();
  const placeId = route.params.placeId;
  const [place, setPlace] = useState<Place | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const showMapHandler = () => {
    navigation.navigate('MapScreen');
  };

  useEffect(() => {
    let active = true;
    setIsFetched(false);

    const fetchPlace = () => {
      getPlace(placeId).then((result) => {
        setPlace(result);
        navigation.setOptions({
          title: result?.title,
        });
      }).finally(() => setIsFetched(true));
    }

    if (isFocused && active) {
      fetchPlace();
    }

    return () => {
      active = false;
    }
  }, [isFocused, placeId]);

  if (!isFetched) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" animating={true} color={palette.main} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place?.imageUri }} style={styles.image} />

      <View style={styles.locationContainer}>
        <View style={styles.infoContainer}>
          <Text textAlign="center">{place?.address || ''}</Text>
        </View>

        <Button mode="outlined" icon="map" onPress={showMapHandler} style={styles.button}>
          View on Map
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 18,
    paddingBottom: 8,
    paddingHorizontal: 18,
  },
  image: {
    flex: 1,
    height: '35%',
    minHeight: 250,
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
