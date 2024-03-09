import { StyleSheet, View } from 'react-native';
import { FC, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  style?: (Record<string, string | number>)[];
}
export const Container: FC<ContainerProps> = ({ children, style = [] }) => {
  return (
    <View style={[styles.container, ...style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
