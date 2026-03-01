import { createCategory, getAllCategories } from "@/context/category";
import { COLORS } from "@/global/color";
import CustomModal from "@/global/custom-modal";
import { PageHeader } from "@/global/page-header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';

 
export default function AddCategoryScreen() { 
  const [categories, setCategories] = useState([]);
  console.log('categories', categories);
  
  const [loading, setLoading] = useState(true);

  // 1. Add a state to force re-render
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [refresh]);

  const loadCategories = async () => {
    try {
      const storedCategories = await getAllCategories(); 
      setCategories(Array.isArray(storedCategories) ? storedCategories : []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50" stickyHeaderIndices={[0]}>
        <PageHeader title="Categories" />
        
        <CategoryCard setRefresh={setRefresh} />

        {/* 3. The Map Implementation */}
        <View className="px-4 py-2">
          {categories.length > 0 ? (
            categories.map((category: any, index) => (
              <CategoryItem 
                key={category.id || category._id || index} // Use ID if available, else index
                title={category.name || category.title || "Untitled"} 
                id={category.id || category._id} 
              />
            ))
          ) : (
            /* 4. Empty State Handler */
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


const CategoryCard = ({setRefresh}: any) => { 
 const [isModalVisible, setModalVisible] = useState(false);
 const [categoryName, setCategoryName] = useState(""); 

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCategory = async () => {
  if (!categoryName.trim()) return; // Don't add empty names
  try {
    createCategory(categoryName.trim());
    setCategoryName(""); 
    setModalVisible(false); 
    setRefresh(true);
  } catch (error) {
    console.error("Error saving category:", error);
  }
};

  return (
    <View className="p-6 rounded-xl shadow-sm mt-4 mx-6 overflow-hidden mb-4">
      <LinearGradient
        colors={[COLORS.black, COLORS.accent]} 
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.background}
      /> 
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-bold text-2xl text-white">Add Budget</Text>
          <Text className="font-bold text-2xl text-white mb-2">Category</Text>
           <TouchableOpacity onPress={toggleModal} style={{backgroundColor: COLORS.primary, padding: 10, borderRadius: 10, marginTop: 10}}>
            <View className="flex-row items-center justify-center gap-2">
              <Ionicons name="add-circle" size={24} color="white" />
              <Text className="text-white font-bold text-lg"> 
                Add New Categories
              </Text>
            </View>
           </TouchableOpacity> 
        </View>
        <Image 
          source={require("../../assets/category.png")} 
          style={{ width: 40, height: 40, tintColor: 'white' }} 
        />
      </View>

      <Modal isVisible={isModalVisible} className="mt-16">
        <View style={{flex: 1}}>
          <TouchableOpacity 
            onPress={toggleModal} 
            style={{
              backgroundColor: COLORS.primary, 
              color: COLORS.white, 
              padding: 10, 
              borderRadius: 10, 
              marginTop: 10
            }}>
              <Text className="text-white font-bold text-lg text-center">Close</Text>
          </TouchableOpacity> 
          <View className="flex-1 justify-center items-center">
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]} 
                start={{ x: 0, y: -1 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            />
           <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput 
              placeholder="Enter Category Name" 
              placeholderTextColor="white" 
              className="text-white font-bold text-lg text-center border border-white px-4 py-2 rounded-xl placeholder:text-white/60" 
              value={categoryName}
              onChangeText={setCategoryName}
            /> 
            <TouchableOpacity onPress={() => handleAddCategory()} style={{backgroundColor: COLORS.primary, padding: 10, borderRadius: 10, marginTop: 10}}>
              <Text className="text-white font-bold text-lg"> 
                Add New Categories
              </Text>
            </TouchableOpacity> 
           </KeyboardAvoidingView> 
          </View>     
        </View> 
      </Modal> 
    </View>
  );
}




const CategoryItem = ({ title, id }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    console.log("Category pressed", id);
    setModalVisible(false)
  }; 

  const handlePress = (id: string) => {
    console.log("Category pressed", id);
    setModalVisible(true)
  };
  return (
    <View className="flex-row items-center justify-between p-6 bg-white rounded-xl mb-4 shadow-sm mx-6">
    <View className="flex-row items-center gap-4">
      <View style={{ width: 45, height: 45, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          source={require("../../assets/category.png")} 
          style={{ width: 20, height: 20, tintColor: 'white' }} 
        />
      </View>
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
    </View>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>

    <CustomModal
      visible={modalVisible}
      title="Confirm Delete!"
      message="Are you sure you want to delete this category?"
      type="success" // success | error | warning | info | confirm
      confirmText="Yes"
      onConfirm={handleConfirm} 
      onCancel={() => setModalVisible(false)} // only works if onlyConfirm = false
    /> 
  </View>
  )
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});