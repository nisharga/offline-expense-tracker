import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider> 
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}> 
        <StatusBar style="dark" /> 
        <Stack screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="(tabs)/index" /> 
          <Stack.Screen name="(tabs)/expense-list-screen" />
          <Stack.Screen name="(tabs)/add-expense-screen" />
          <Stack.Screen name="(tabs)/add-category-screen" />
          <Stack.Screen name="(tabs)/setting-screen" />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack> 
      </SafeAreaView>
    </SafeAreaProvider>
  );
}