import { FC } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text } from '../Text';
import { Place } from '../../models/place';
import { PlaceItem } from './PlaceItem';

type PlacesListProps = {
  places?: Place[];
}
export const PlacesList: FC<PlacesListProps> = ({ places = [] }) => {
  return !places?.length ? (
    <View style={styles.emptyContainer}>
      <Text textAlign="center" variant="titleMedium">No places added yet</Text>
    </View>
  ) : (
    <FlatList data={places} keyExtractor={(item) => item?.id} renderItem={({ item }) => <PlaceItem place={item} />} />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
