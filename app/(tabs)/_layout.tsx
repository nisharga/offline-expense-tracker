import { Ionicons } from '@expo/vector-icons'; // Reliable icon set
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // Optional: improves the look on iOS by shifting icons slightly
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expense-list-screen"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "receipt" : "receipt-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense-screen"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={30} name={focused ? "add-circle" : "add-circle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-category-screen"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "grid" : "grid-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting-screen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "settings" : "settings-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}