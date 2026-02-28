import { COLORS } from "@/global/color";
import CustomModal from "@/global/custom-modal";
import { PageHeader } from "@/global/page-header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';

export default function AddCategoryScreen() { 
  return (
    <ScrollView className="flex-1 bg-gray-50" stickyHeaderIndices={[0]}>
        <PageHeader 
          title="Categories"  
        />
        <CategoryCard />
        <CategoryItem  
          title="Home"
          id="1000"
        /> 
    </ScrollView>
  );
}   


const CategoryCard = () => { 
 const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="p-6 rounded-xl shadow-sm mt-4 mx-6 overflow-hidden">
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

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text> 
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
 
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


const CategoryItem = ({ title, id }: any) => {
  const [modalVisible, setModalVisible] = useState(true);

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
      type="confirm" // success | error | warning | info | confirm
      confirmText="Yes"
      onConfirm={handleConfirm} 
      onCancel={() => setModalVisible(false)} // only works if onlyConfirm = false
    />

  </View>
  )
};
