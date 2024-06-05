import { FC } from 'react';
import { Pressable, View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Place } from '../../models/place';
import { ShadowView } from '../ShadowView';
import { Text } from '../Text';
import { Theme } from '../../theme';

type PlaceItemProps = {
  place: Place;
  onSelect?: () => void;
}

export const PlaceItem: FC<PlaceItemProps> = ({ place, onSelect }) => {
  const theme: Theme = useTheme();

  return (
    <ShadowView>
      <Pressable
        style={({ pressed }) => [
          styles.item,
          pressed ? styles.itemPressed : null
        ]}
        onPress={onSelect}
      >
        <Image source={{ uri: place?.imageUri }} style={styles.image} />

        <View style={styles.info}>
          <Text variant="headlineSmall" style={{ color: theme.palette.grey['700']}}>
            {place?.title}
          </Text>

          <Text variant="bodyMedium" style={{ color: theme.palette.grey['300']}}>
            {place?.address || ''}
          </Text>
        </View>
      </Pressable>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  itemPressed: {
    opacity: 0.5,
  },
  image: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  info: {
    flex: 2,
    padding: 8,
  }
});
