import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { Theme, ThemeColor } from '../../../theme';

interface ThemeSelectI {
  defaultValue: ThemeColor;
  onChange: (val: ThemeColor) => void;
}

const options = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Error', value: 'error' },
  { label: 'Warning', value: 'warning' },
];

export const ThemeSelect: FC<ThemeSelectI> = ({ defaultValue, onChange = () => {} }) => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState<ThemeColor>(defaultValue);

  const onValueChange = (value: ThemeColor) => {
    setValue(value);
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <RNSelect
        style={{
          ...styles,
          inputIOS: {
            ...styles.inputIOS,
            backgroundColor: theme.palette[value].container,
            borderColor: theme.palette[value].main,
            borderRadius: theme.palette.borderRadius,
            color: theme.palette.text.primary,
          },
          inputAndroid: {
            ...styles.inputAndroid,
            backgroundColor: theme.palette[value].container,
            borderColor: theme.palette[value].main,
            borderRadius: theme.palette.borderRadius,
            color: theme.palette.text.primary,
          },
        }}
        useNativeAndroidPickerStyle={false}
        items={options}
        placeholder={{}}
        value={value}
        onValueChange={onValueChange}
        Icon={() => <Ionicons name="chevron-down" size={24} color={theme.palette[value].main} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  inputIOS: {
    marginVertical: 8,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 2,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginVertical: 8,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 2,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 17,
    right: 10,
  },
});
