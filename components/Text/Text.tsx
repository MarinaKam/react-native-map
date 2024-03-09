import { FC } from 'react';
import { useTheme, Text as MuiText, TextProps } from 'react-native-paper';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Theme } from '../../theme';
import { StyleSheet } from 'react-native';

type textAlignType = 'center' | 'left' | 'right';
interface TextInterface {
  children: string;
  white?: boolean;
  style?: StyleProp<TextStyle>;
  textAlign?: textAlignType;
}

export const Text: FC<TextInterface & TextProps<string>> = ({
  textAlign = 'left',
  white = false,
  children,
  style,
  variant = 'bodyLarge'
}) => {
  const theme: Theme = useTheme();

  return (
    <MuiText
      variant={variant}
      style={[{
        color: white ? theme.palette.text.white : theme.palette.text.primary,
      }, styles[textAlign], style]}
    >
      {children}
    </MuiText>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  }
});

