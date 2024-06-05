import { PlaceForm } from '../components/Places/PlaceForm';
import { useNavigation } from '@react-navigation/native';
import { Place, PlaceType } from '../models/place';
import { useMap } from '../store';
import { addPlace } from '../db';

export const AddPlace = () => {
  const navigation = useNavigation();
  const { deletePin } = useMap();

  const handleCreatePlace = async (val: PlaceType) => {
    const place = new Place(val);

    await addPlace(place).then(() => {
      deletePin();
      // @ts-ignore
      navigation.navigate('AllPlaces');
    });
  };

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};
