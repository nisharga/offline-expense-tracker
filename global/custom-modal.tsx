import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "./color";


const CustomModal = ({
 visible,
 title,
 message,
 onConfirm,
 onCancel,
 confirmText = "OK",
 cancelText = "Cancel",
 onlyConfirm = false,
 type = "info", // 'success', 'error', 'warning', 'info', 'confirm'
 icon,
}: any) => {
 

 const getIconConfig = () => {
   if (icon) return icon;


   switch (type) {
     case "success":
       return { name: "checkmark-circle", color: COLORS.primary };
     case "error":
       return { name: "close-circle", color: COLORS.accent };
     case "warning":
       return { name: "alert-circle", color: COLORS.secondary };    
     case "confirm":
       return { name: "help-circle", color: COLORS.primary };
     default:
       return { name: "information-circle", color: COLORS.primary };
   }
 };


 const iconConfig = getIconConfig();


 return (
   <Modal
     visible={visible}
     transparent
     animationType="fade"
     onRequestClose={onCancel || onConfirm}
   >
     <View style={styles.overlay}>
       <View style={[styles.container, { backgroundColor: COLORS.white }]}>
         {/* Icon */}
         <View
           style={[
             styles.iconContainer,
             { backgroundColor: iconConfig.color + "15" },
           ]}
         >
           <Ionicons
             name={iconConfig.name}
             size={48}
             color={iconConfig.color}
           />
         </View>


         {/* Title */}
         {title ? (
           <Text style={[styles.title, { color: COLORS.primary }]}>
             {title}
           </Text>
         ) : null}


         {/* Message */}
         <Text style={[styles.message, { color: COLORS.primary }]}>
           {message}
         </Text>


         {/* Actions */}
         <View style={styles.actions}>
           {!onlyConfirm && onCancel && (
             <TouchableOpacity
               style={[
                 styles.button,
                 styles.cancelButton,
                 { borderColor: COLORS.primary },
               ]}
               onPress={onCancel}
               activeOpacity={0.7}
             >
               <Text
                 style={[styles.cancelText, { color: COLORS.primary }]}
               >
                 {cancelText}
               </Text>
             </TouchableOpacity>
           )}
           <TouchableOpacity
             style={[
               styles.button,
               styles.confirmButton,
               {
                 backgroundColor:
                   type === "error" ? COLORS.accent : COLORS.primary,
               },
             ]}
             onPress={onConfirm}
             activeOpacity={0.7}
           >
             <Text style={styles.confirmText}>{confirmText}</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   </Modal>
 );
};


const styles = StyleSheet.create({
 overlay: {
   flex: 1,
   backgroundColor: "rgba(0,0,0,0.6)",
   justifyContent: "center",
   alignItems: "center",
 },
 container: {
   width: "85%",
   maxWidth: 400,
   borderRadius: 20,
   padding: 24,
   alignItems: "center",
   elevation: 10,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 10 },
   shadowOpacity: 0.3,
   shadowRadius: 20,
 },
 iconContainer: {
   width: 80,
   height: 80,
   borderRadius: 40,
   justifyContent: "center",
   alignItems: "center",
   marginBottom: 20,
 },
 title: {
   fontSize: 20,
   fontWeight: "700",
   marginBottom: 12,
   textAlign: "center",
   fontFamily: "Poppins-Bold",
   letterSpacing: -0.3,
 },
 message: {
   fontSize: 15,
   textAlign: "center",
   lineHeight: 22,
   marginBottom: 24,
   fontFamily: "Poppins-Regular",
   fontWeight: "400",
 },
 actions: {
   flexDirection: "row",
   gap: 12,
   width: "100%",
 },
 button: {
   flex: 1,
   paddingVertical: 14,
   paddingHorizontal: 20,
   borderRadius: 12,
   alignItems: "center",
   justifyContent: "center",
 },
 cancelButton: {
   borderWidth: 1,
   backgroundColor: "transparent",
 },
 confirmButton: {
   elevation: 2,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 4,
 },
 cancelText: {
   fontSize: 15,
   fontWeight: "600",
   fontFamily: "Poppins-SemiBold",
   letterSpacing: -0.1,
 },
 confirmText: {
   color: "#FFFFFF",
   fontSize: 15,
   fontWeight: "600",
   fontFamily: "Poppins-SemiBold",
   letterSpacing: -0.1,
 },
});


export default CustomModal;
