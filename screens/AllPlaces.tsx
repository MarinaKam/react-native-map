import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components';
import { Place } from '../models/place';
import { getPlaces } from '../db';

export const AllPlaces = () => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    let active = true;

    const fetchPlaces = () => {
      getPlaces().then((result) => setLoadedPlaces(result));
    };

    if (isFocused && active) {
      fetchPlaces();
    }

    return () => {
      active = false;
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
