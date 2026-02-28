import { PageHeader } from "@/global/page-header";
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AddCategoryScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50" stickyHeaderIndices={[0]}>
        <PageHeader 
          title="Categories"  
        />
        <CategoryCard />
    </ScrollView>
  );
}   


const CategoryCard = () => {
  return (
    <View className="p-4 rounded-xl shadow-sm mt-4 mx-6 overflow-hidden">
      <LinearGradient
        // Blue to Violet: Left to Right
        colors={['#4F46E5', '#ff0000']} 
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      />
      
      {/* Content Container */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white font-bold text-lg">Add Budget</Text>
          <Text className="text-white font-bold text-lg">Category</Text>
        </View>
        <Image 
          source={require("../../assets/category.png")} 
          style={{ width: 40, height: 40, tintColor: 'white' }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});