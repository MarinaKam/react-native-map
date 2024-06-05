import { PlacesList } from '../components';
import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Place } from '../models/place';
import { RootStackParamList } from '../navigation';

type AllPlacesRoute = RouteProp<RootStackParamList, 'AllPlaces'>;

export const AllPlaces = () => {
  const route = useRoute<AllPlacesRoute>();
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (isFocused && route?.params?.place) {
      if (!loadedPlaces.find((place) => place.id === route?.params?.place?.id)) {
        setLoadedPlaces((curPlaces) => [...curPlaces, (route?.params?.place as Place)]);
      }
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
