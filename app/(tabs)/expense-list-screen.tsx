import { PageHeader } from "@/global/page-header";
import { ImageBackground, ScrollView, Text, View } from "react-native";

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
    </ScrollView>
  );
}

 
const Card = ({totalExpense, last30DaysExpense}: {totalExpense: number, last30DaysExpense: number}) => {
  return (
    <View className="mx-6"> 
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
    </View> 
  )
}