import { Text, View } from "react-native";

export default function ExpenseListScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center justify-center bg-red-500">
        <Text className="text-xl font-bold text-blue-800">
          Welcome to Nativewind!
        </Text>
      </View>
      <View className="items-center justify-center bg-green-500">
        <Text className="text-xl font-bold text-blue-800">
          Welcome to Nativewind!
        </Text>
      </View>
    </View>
  );
}   