import { Ionicons } from '@expo/vector-icons'; // Reliable icon set
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { COLORS } from '@/global/color';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View } from 'react-native';

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
        sceneStyle: { flex: 1, backgroundColor: 'white' },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 10, // Shadow for Android
          shadowColor: '#000', // Shadow for iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 65,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
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
          tabBarIcon: ({ color,focused }) => (
            <View style={{
              backgroundColor: COLORS.primary,  
              width: 55,
              height: 55,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,  
              elevation: 5,
              shadowColor: COLORS.primary,  
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              top: -20
            }}>
              <Ionicons name="add" size={35} color="#ffffff" />
            </View>
          ),
        }}
      />


      {/* <Tabs.Screen
        name="add-expense-screen"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={30} name={focused ? "add-circle" : "add-circle-outline"} color={color} />
          ),
        }}
      /> */}
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