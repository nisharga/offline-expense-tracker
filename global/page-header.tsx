import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

export const PageHeader = ({ title, showBackButton, rightElement }: PageHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }} 
      className="bg-white border-b border-gray-100 shadow-sm flex-row items-center justify-center "
    >
     <Text className="text-xl font-bold text-gray-900">{title}</Text>
    </View>
  );
};