import { FC, ReactNode } from 'react';
import { useTheme } from 'react-native-paper';
import { Platform, StyleSheet, View } from 'react-native';
import { Theme } from '../../theme';

type ShadowViewProps = {
  children: ReactNode;
  style?: Record<string, string | number>[];
}

export const ShadowView: FC<ShadowViewProps> = ({ children, style }) => {
  const theme: Theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { shadowColor: theme.palette.text.primary },
        ...(style || [])
      ]}
    >
      {children}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 18,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
