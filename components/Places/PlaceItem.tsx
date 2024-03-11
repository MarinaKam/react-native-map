import { FC } from 'react';
import { Pressable, View, StyleSheet, Image } from 'react-native';
import { Place } from '../../models/place';
import { ShadowView } from '../ShadowView';
import { Text } from '../Text';

type PlaceItemProps = {
  place: Place;
  onSelect: () => void;
}

export const PlaceItem: FC<PlaceItemProps> = ({ place, onSelect }) => {
  return (
    <ShadowView>
      <Pressable style={({ pressed }) => (pressed ? styles.itemPressed : null)} onPress={onSelect}>
        <Image source={{ uri: place?.imageUri }} />

        <View>
          <Text>{place?.title}</Text>
          <Text>{place?.address}</Text>
        </View>
      </Pressable>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  itemPressed: {
    opacity: 0.5,
  },
});
