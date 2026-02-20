import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  // const [isUnlocked, setIsUnlocked] = useState(false);
  // useEffect(() => {
  //   // Automatically trigger on mount
  //   handleBiometricAuth(() => setIsUnlocked(true));
  // }, []);
  // if (!isUnlocked) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-white p-6">
  //       <Text className="text-xl mb-6">App is Locked</Text>
  //       <TouchableOpacity 
  //         className="bg-blue-500 p-4 rounded-full"
  //         onPress={() => handleBiometricAuth(() => setIsUnlocked(true))}
  //       >
  //         <Text className="text-white">Tap to Unlock</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaProvider> 
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}> 
        <StatusBar style="dark" /> 
        <Stack screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="(tabs)/index" /> 
        </Stack> 
      </SafeAreaView>
    </SafeAreaProvider>
  );
}