import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() { 
  const { isUnlocked, isLockEnabled, authenticate } = useAuth();

  // If the user enabled the lock and hasn't scanned their finger yet
  if (isLockEnabled && !isUnlocked) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-2xl font-bold mb-8">App Locked</Text>
        <TouchableOpacity 
          onPress={authenticate}
          className="bg-blue-500 p-4 rounded-2xl w-full"
        >
          <Text className="text-white text-center font-bold">Unlock with Biometrics</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaProvider> 
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}> 
        <StatusBar style="dark" />
        <AuthProvider> 
        <Stack screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="(tabs)/index" /> 
        </Stack> 
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}