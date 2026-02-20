import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    // Add flex-1 here so the container actually fills the screen
    <View className="flex-1 bg-white">
      
      {/* This will now take up all available space */}
      <View className="flex-1 items-center justify-center bg-red-500">
        <Text className="text-xl font-bold text-blue-800">
          Welcome to Nativewind!
        </Text>
      </View>

      {/* This will sit at the very bottom */}
      <View className="p-4 items-center">
        <Text className="text-gray-600">
          Showing this
        </Text>
      </View>
      
    </View>
  );
}