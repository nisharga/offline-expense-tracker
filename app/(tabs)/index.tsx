import { storage } from '@/context/storage';
import { PageHeader } from '@/global/page-header';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

// 1. Define your data per month
// const MONTHLY_DATA: any = {
//   'Jan': [
//     { value: 50, color: '#0000ff', text: '50%' },
//     { value: 30, color: '#79D2DE', text: '30%' },
//     { value: 20, color: '#ED6665', text: '20%' },
//   ],
//   'Feb': [
//     { value: 10, color: '#0000ff', text: '10%' },
//     { value: 60, color: '#79D2DE', text: '60%' },
//     { value: 30, color: '#ED6665', text: '30%' },
//   ],
//   'Mar': [
//     { value: 40, color: '#0000ff', text: '40%' },
//     { value: 40, color: '#79D2DE', text: '40%' },
//     { value: 20, color: '#ED6665', text: '20%' },
//   ],
// };

const dropdownData: any = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
];

export default function HomeScreen() {
  const currentMonthIndex = new Date().getMonth(); 
  const [month, setMonth] = useState(currentMonthIndex);
  const [data, setData] = useState({}); 
  console.log('month', month);
  console.log('data', data);
  
 // Function to load data
  const loadData = async () => {
    try {
      const storedCategories = await storage.getCategoryTotalsByMonth(month);
      setData(storedCategories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }  
  };

 useEffect(() => {
    loadData();
  }, [month]);
  
  return (
    <ScrollView className="flex-1 bg-gray-50" stickyHeaderIndices={[0]}>
      <PageHeader 
        title="My Expenses" 
        showBackButton={true} 
        rightElement={<Text className="text-blue-500">Edit</Text>}
      />

      <View className='p-4'>
        <View className="bg-white p-4 rounded-3xl shadow-sm items-center">
        
        <View className='flex flex-row w-full justify-between'>
          <Text className="text-xl font-bold">Summary</Text> 
          <View style={{width: 150}}>
            <Dropdown
              style={{
                height: 30,
                width: '100%',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 15,
                marginBottom: 30,
                backgroundColor: '#e5e7eb', 
              }}
              data={dropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select Month"
              value={month}
              onChange={item => setMonth(item.value)}
            />
          </View>
        </View>

        {/* --- PIE CHART --- */}
        {/* Adjusted radius and innerRadius for a much larger, better look */}
        {/* <PieChart
          donut 
              isAnimated={true}
              animationDuration={2000}
          radius={120}           // Total size of the chart
          innerRadius={90}        // Size of the hole (donut)
          textSize={14}
          fontWeight="bold"
          data={MONTHLY_DATA[month]}
          
          centerLabelComponent={() => (
            <View className="items-center justify-center">
              <Text className="text-gray-400 text-sm font-medium">Amount</Text>
              <Text className="text-xl font-bold">${
                MONTHLY_DATA[month].reduce((acc: any, curr: any) => acc + curr.value, 0)
              }</Text>
            </View>
          )}
        /> */}

          {/* --- LEGEND --- */}
          {/* <View className="flex-row justify-center mt-8 gap-4">
            <LegendItem color="#0000ff" label="Food" />
            <LegendItem color="#79D2DE" label="Rent" />
            <LegendItem color="#ED6665" label="Other" />
          </View> */}
        </View>
      </View>

      
    </ScrollView>
  );
}

// Simple Helper Component for the Legend
const LegendItem = ({ color, label }: any) => (
  <View className="flex-row items-center">
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color, marginRight: 6 }} />
    <Text className="text-gray-600 text-sm">{label}</Text>
  </View>
);