import { createCategory, getAllCategories, removeCategory } from "@/context/category";
import { COLORS } from "@/global/color";
import CustomModal from "@/global/custom-modal";
import { PageHeader } from "@/global/page-header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { useCallback, useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";

export default function AddCategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to load data
  const loadCategories = async () => {
    try {
      const storedCategories = await getAllCategories();
      setCategories(Array.isArray(storedCategories) ? storedCategories : []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCategories();
  }, []);

  // Effect triggered by refreshTrigger counter
  useEffect(() => {
    loadCategories();
  }, [refreshTrigger]);

  return (
    <ScrollView 
      className="flex-1 bg-gray-50" 
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          tintColor={COLORS.primary} 
        />
      }
    >
      <PageHeader title="Categories" />

      {/* Passing setRefreshTrigger to Card */}
      <CategoryCard setRefresh={setRefreshTrigger} />

      <View className="px-4 py-2">
        {categories.length > 0 ? (
          categories.map((category: any, index) => (
            <CategoryItem
              key={category.id || category._id || index}
              title={category.name || category.title || "Untitled"}
              id={category.id || category._id}
              // CRITICAL: Pass setRefresh to Item so delete triggers update
              setRefresh={setRefreshTrigger} 
              index={index}
            />
          ))
        ) : (
          !loading && (
            <View className="py-10 items-center">
              <Text className="text-gray-400">No categories found</Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const CategoryCard = ({ setRefresh }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
const [isRecognizing, setIsRecognizing] = useState(false);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      // 1. Await the creation
      await createCategory(categoryName.trim());
      setCategoryName("");
      setModalVisible(false);
      // 2. Trigger parent refresh
      setRefresh((prev: number) => prev + 1);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };
  

  // start
  useSpeechRecognitionEvent("start", () => {
    setIsRecognizing(true);
  })

 // set this: event.results[0].transcript
  useSpeechRecognitionEvent("result", (event) => {  
  if (event.results && event.results.length > 0) {
    const text = event.results[0].transcript; 
    setCategoryName(text);
  }
  })

  // error event
  useSpeechRecognitionEvent("error", (event) => {
    console.log("❌ Error:", event.error, event.message);
    setIsRecognizing(false);
  });

  // end event
  useSpeechRecognitionEvent("end", () => { 
    setIsRecognizing(false);
  });

  // start listening
  const startListening = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        console.log("Permission denied");
        return;
      }

      setCategoryName(""); 

      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true, 
        continuous: false,
      })
    } catch (err) {
      console.error("Failed to start:", err);
    }
  };

  // stop listening
  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setIsRecognizing(false);
    } catch (err) {
      console.error("Failed to stop:", err);
    }
  };



  return (
    <Animated.View entering={ZoomIn.duration(2000).springify()} className="p-6 rounded-xl shadow-sm mt-4 mx-6 overflow-hidden mb-4">
      <LinearGradient colors={[COLORS.black, COLORS.accent]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.background} />
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-bold text-2xl text-white font-custom">Add Budget</Text>
          <Text className="font-bold text-2xl text-white mb-2 font-custom">Category</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: COLORS.primary, padding: 10, borderRadius: 10, marginTop: 10 }}>
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="add-circle" size={24} color="white" />
              <Text className="text-white font-bold text-lg">Add New Categories</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image source={require("../../assets/category.png")} style={{ width: 40, height: 40, tintColor: 'white' }} />
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View className="bg-white p-6 rounded-2xl relative">
            <Text className="text-xl font-bold mb-4 text-center">New Categoryss</Text>
            <TextInput
              placeholder="Enter Category Name"
              className="border border-gray-200 p-4 rounded-xl mb-4"
              value={categoryName}
              onChangeText={setCategoryName}
              autoFocus
            />
            <TouchableOpacity className="absolute right-8 top-20"
            onPress={isRecognizing ? stopListening : startListening}>
              {
                isRecognizing ? (
                  <Ionicons name="mic" size={32} className="text-gray-100" />
                ) : (
                  <Ionicons name="mic-outline" size={32} className="text-gray-100" />
                )
              }
            </TouchableOpacity>
            <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 p-4 rounded-xl bg-gray-100" onPress={() => setModalVisible(false)}>
                    <Text className="text-center font-bold text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-2 p-4 rounded-xl" style={{backgroundColor: COLORS.primary}} onPress={handleAddCategory}>
                    <Text className="text-center font-bold text-white px-4">Create</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const CategoryItem = ({ title, id, setRefresh, index }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = async () => {
    try {
        await removeCategory(id);
        setModalVisible(false);
        // CRITICAL: Trigger parent refresh after delete
        setRefresh((prev: number) => prev + 1);
    } catch (err) {
        console.error("Delete failed", err);
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(900).delay(index * 200).springify()} className="flex-row items-center justify-between p-6 bg-white rounded-xl mb-4 shadow-sm mx-6">
      <View className="flex-row items-center gap-4">
        <View style={{ width: 45, height: 45, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require("../../assets/category.png")} style={{ width: 20, height: 20, tintColor: 'white' }} />
        </View>
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  background: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }
});