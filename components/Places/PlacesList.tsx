import { FC } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import { Place } from '../../models/place';
import { Text } from '../Text';
import { PlaceItem } from './PlaceItem';

type PlacesListProps = {
  places?: Place[];
}

type NavProp = NavigationProp<RootStackParamList, 'PlaceDetails'>;

export const PlacesList: FC<PlacesListProps> = ({ places = [] }) => {
  const navigation = useNavigation<NavProp>();

  const selectPlaceHandler = (id: number) => {
    navigation.navigate('PlaceDetails', { placeId: `${id}` });
  }

  return !places?.length ? (
    <View style={styles.emptyContainer}>
      <Text textAlign="center" variant="titleMedium">No places added yet</Text>
    </View>
  ) : (
    <FlatList
      data={places}
      keyExtractor={(item) => `${item?.id}`}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
