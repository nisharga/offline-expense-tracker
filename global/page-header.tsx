import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
  isBottomRounded?: boolean;
}

export const PageHeader = ({ title, showBackButton, rightElement, isBottomRounded }: PageHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // 1. Define shared values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20); // Starts 20 units below

  useEffect(() => {
    // 2. Trigger animations on mount
    opacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    translateY.value = withDelay(
      200, 
      withTiming(0, { 
        duration: 800, 
        easing: Easing.out(Easing.exp) 
      })
    );
  }, []);

  // 3. Link values to style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View 
      style={{ paddingTop: 10, paddingBottom: 20 }} 
      className={`bg-white ${isBottomRounded ? "" : "border-b border-gray-100 shadow-sm"}  flex-row items-center justify-center `}
    >
     <Animated.Text style={animatedStyle} 
     className="text-xl font-bold text-gray-900">{title}</Animated.Text>
    </View>
  );
};