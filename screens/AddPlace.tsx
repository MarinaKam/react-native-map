import { PlaceForm } from '../components/Places/PlaceForm';
import { useNavigation } from '@react-navigation/native';
import { Place, PlaceType } from '../models/place';
import { useMap } from '../store';

export const AddPlace = () => {
  const navigation = useNavigation();
  const { deletePin } = useMap();

  const handleCreatePlace = (val: PlaceType) => {
    const place = new Place(val);

    deletePin();
    // @ts-ignore
    navigation.navigate('AllPlaces', { place });
  };

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};
