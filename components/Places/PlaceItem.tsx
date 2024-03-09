import { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Place } from '../../models/place';

type PlaceItemProps = {
  place: Place;
}

export const PlaceItem: FC<PlaceItemProps> = () => {
  return (
    <View>
      <Text>Place Item</Text>
    </View>
  );
};
