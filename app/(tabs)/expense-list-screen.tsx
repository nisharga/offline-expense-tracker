import { COLORS } from "@/global/color";
import CustomModal from "@/global/custom-modal";
import { PageHeader } from "@/global/page-header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FlipInYRight } from "react-native-reanimated";

export default function ExpenseListScreen() { 
  return (
    <ScrollView 
      className="flex-1 bg-gray-50" 
      stickyHeaderIndices={[0]}
      
    >
       <PageHeader 
           title="View Expenses"  
           isBottomRounded={true}
         />
         <View className="w-full h-[20px] rounded-b-[20px] bg-white"></View>

      <Card totalExpense={9000} last30DaysExpense={1000}/>

      <ExpenseItem title="Expense 1" id="1" setRefresh={() => {}} 
        category="Category 1" price="100" index={1}/> 
        <ExpenseItem title="Expense 1" id="1" setRefresh={() => {}} 
        category="Category 1" price="100" index={2}/> 
        <ExpenseItem title="Expense 1" id="1" setRefresh={() => {}} 
        category="Category 1" price="100" index={3}/> 
    </ScrollView>
  );
}

 
const Card = ({totalExpense, last30DaysExpense}: {totalExpense: number, last30DaysExpense: number}) => {
  return (
    <Animated.View entering={FlipInYRight.duration(600)} className="mx-6 mb-4"> 
      <View className="h-60 w-full rounded-xl mt-6 overflow-hidden relative">
    
        <ImageBackground
          source={require("../../assets/bg.jpg")}
          resizeMode="cover"
          className="flex-1 justify-center" 
          imageStyle={{ opacity: 0.3 }} 
        >
           
          <View className="absolute inset-0 bg-black/50" /> 

          <View className="flex-row justify-between h-32 items-center">
            <View className="p-4">
            <Text className="text-white font-medium tracking-normal text-xs text-gray-400 mb-2">Total Expense Balance</Text>
             <Text className="text-white text-3xl font-medium tracking-normal text-gray-400 ">{totalExpense}$</Text>
          </View>

          <View className="p-4 text-right">
            <Text className="text-white font-medium tracking-normal text-xs text-gray-400 mb-2 text-right">Last 30 days Expense</Text>
             <Text className="text-white text-3xl font-medium tracking-normal text-gray-400 ">{last30DaysExpense}$</Text>
          </View>
          </View>

          <View className="p-4">
            <Text className="text-white text-lg font-medium tracking-wide uppercase">Total Expense Card</Text>
             <Text className="line-clamp-3 text-white">
    See your spending in the last 30 days and overall lifetime expenses – all in one clear view.
  </Text>
          </View>
        </ImageBackground>

        

        <View className="border border-dashed border-white absolute bottom-28 w-full"></View>
        <View className="w-8 h-8 rounded-full bg-white absolute bottom-24 -left-4"></View>
        <View className="w-8 h-8 rounded-full bg-white absolute bottom-24 -right-4"></View>
      </View>
    </Animated.View> 
  )
}



const ExpenseItem = ({ title, id, setRefresh, price, category, index }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = async () => {
    try {
        // await removeCategory(id);
        setModalVisible(false);
        // CRITICAL: Trigger parent refresh after delete
        setRefresh((prev: number) => prev + 1);
        console.log("deleted successfully", id);
    } catch (err) {
        console.error("Delete failed", err);
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(900).delay(index * 200).springify()} className="flex-row items-center justify-between p-6 bg-white rounded-xl mb-4 shadow-sm mx-6">
      <View className="flex-row items-center gap-4">
        <View style={{ width: 45, height: 45, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require("../../assets/expense.png")} style={{ width: 24, height: 24, tintColor: 'white' }} />
        </View>
        <View>
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <Text className="text-sm font-normal tracking-wide text-gray-800">{category}</Text>
        </View>
      </View>
      <View className="flex-row gap-4">
        <Text className="text-lg font-bold text-gray-800">${price}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        title="Confirm Delete!"
        message={`Are you sure you want to delete "${title}"?`}
        type="confirm"
        confirmText="Delete"
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </Animated.View>
  );
};