import { FC } from 'react';
import { Button as MuiButton } from 'react-native-paper';
import { Props } from 'react-native-paper/src/components/Button/Button';
import { useGlobalTheme } from '../../store';

export const Button: FC<Props> = ({ children, style = {}, ...props }) => {
  const { palette } = useGlobalTheme();

  return (
    <MuiButton
      style={[props?.mode === 'outlined' ? { borderColor: palette.main } : {}, style]}
      theme={{ colors: { primary: palette.main } }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
