import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string | undefined;
  darkColor?: string | undefined;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: "transparent", dark: "#000" }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
