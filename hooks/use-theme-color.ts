/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export const getRandomVibrantColor = () => {
  // Generate a random Hue (0-360)
  const hue = Math.floor(Math.random() * 360);
  // Keep Saturation high (70-90%) and Lightness medium (50-60%) for vibrancy
  return `hsl(${hue}, 80%, 55%)`;
};