import { getAllCategories } from "@/context/category";
import { storage } from "@/context/storage";
import { COLORS } from "@/global/color";
import CustomModal from "@/global/custom-modal";
import { PageHeader } from "@/global/page-header";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";

export default function AddExpenseScreen() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // UI States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const [modalVisible, setModalVisible] = useState(false); 
  const closeModal = () => setModalVisible(false);


  const loadCategories = async () => {
    try {
      const storedCategories = await getAllCategories();
      setCategories(Array.isArray(storedCategories) ? storedCategories : []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [isDropdownOpen]);

  const handleSave = async () => {
    // Validation Logic
    if (!expenseName.trim()) {
      setError("Please enter an expense name");
      return;
    }
    if (!expenseAmount || isNaN(expenseAmount)) {
      setError("Please enter a valid numeric amount");
      return;
    }
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    // Clear error and log data
    setError("");
    const expenseData = {
      id: Date.now().toString(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: selectedCategory,
      date: new Date().toISOString(),
    };

    // NEW: Save to Storage
    await storage.createExpense(expenseData);

    console.log("Saving Expense:", expenseData);

    Keyboard.dismiss();
    setModalVisible(true);
    setExpenseName("");
    setExpenseAmount("");
    setSelectedCategory(null);
    
    // Logic for saving to AsyncStorage would go here next
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-50" 
      stickyHeaderIndices={[0]} 
      keyboardShouldPersistTaps="handled"
    >
      <PageHeader title="Add Expense" />

      <Animated.View entering={ZoomInEasyDown.duration(700).springify().delay(100)} className="px-6 pt-6">
        <Text className="text-gray-500 font-medium mb-2 uppercase text-xs tracking-widest">
          Expense Name
        </Text>
        <TextInput
          placeholder="e.g. Grocery Shopping"
          className="bg-white border border-gray-200 p-4 rounded-xl mb-6 text-base"
          value={expenseName}
          onChangeText={(val) => {
            setExpenseName(val);
            if (error) setError(""); // Clear error while typing
          }}
        />

        <Text className="text-gray-500 font-medium mb-2 uppercase text-xs tracking-widest">
          Expense Amount
        </Text>
        <TextInput
          placeholder="0.00"
          keyboardType="numeric"
          className="bg-white border border-gray-200 p-4 rounded-xl mb-6 text-base"
          value={expenseAmount}
          onChangeText={(val) => {
            setExpenseAmount(val);
            if (error) setError("");
          }}
        />

        <Text className="text-gray-500 font-medium mb-2 uppercase text-xs tracking-widest">
          Category
        </Text>
        
        {/* Dropdown Trigger */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-white border border-gray-200 p-4 rounded-xl flex-row justify-between items-center"
        >
          <Text className={selectedCategory ? "text-gray-800 text-base" : "text-gray-400 text-base"}>
            {selectedCategory ? selectedCategory.name : "Select a Category"}
          </Text> 
          <Ionicons size={20} name="chevron-down" color={COLORS.primary} />
        </TouchableOpacity>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <View className="bg-white border border-gray-100 rounded-xl mt-2 shadow-sm overflow-hidden">
            {categories.length === 0 ? (
              <Text className="p-4 text-gray-400 italic">No categories found</Text>
            ) : (
              categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="p-4 border-b border-gray-50 flex-row justify-between items-center"
                  onPress={() => {
                    setSelectedCategory(item);
                    setIsDropdownOpen(false);
                    setError("");
                  }}
                >
                  <Text className="text-gray-700">{item?.name}</Text>
                  {selectedCategory?.id === item.id && <Ionicons size={20} name="checkmark" color={COLORS.primary} />
}
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* Error Message */}
        {error ? (
          <View className="mt-6 bg-red-50 p-3 rounded-lg border border-red-100">
            <Text className="text-red-500 text-center font-medium">{error}</Text>
          </View>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          className={`bg-[#2D3C59] p-4 rounded-2xl mt-8 shadow-md`}
        >
          <Text className="text-white text-center font-bold text-lg">
            Save Expense
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <CustomModal
          visible={modalVisible}
          title="Success!"
          message="Your expense has been added successfully."
          type="success" // success | error | warning | info | confirm
         onConfirm={closeModal}
        />
    </ScrollView>
  );
}