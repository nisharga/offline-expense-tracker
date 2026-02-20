import { useAuth } from "@/context/AuthContext";
import { Switch, Text, View } from "react-native";

export default function SettingScreen() {
  const { isLockEnabled, toggleLock } = useAuth();
  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold mb-8">Settings</Text>

      <View className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm">
        <View>
          <Text className="text-lg font-semibold">Biometric Lock</Text>
          <Text className="text-gray-500">Secure your expenses</Text>
        </View>
        
        <Switch 
          value={isLockEnabled} 
          onValueChange={(val) => toggleLock(val)}
          trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
        />
      </View>
    </View>
  );
}   