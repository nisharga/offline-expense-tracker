import { useAuth } from "@/context/AuthContext";
import * as Notifications from 'expo-notifications';
import { useState } from "react";
import { Alert, Platform, Switch, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SettingScreen() {
  const { isLockEnabled, toggleLock } = useAuth();
  
  // 1. State to track if reminder is enabled
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  // 2. Handle the Switch Toggle
  const toggleReminder = async (value: boolean) => {
    setIsReminderEnabled(value);

    if (value) {
      const scheduled = await scheduleDailyReminder();
      if (scheduled) {
        Alert.alert("Reminder Set", "We'll notify you every day at 12:00 PM.");
      } else {
        setIsReminderEnabled(false); // Revert if permission denied
      }
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("All notifications cancelled");
    }
  };

  const scheduleDailyReminder = async () => {
    // Check Permissions
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;
    
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      finalStatus = newStatus;
    }

    if (finalStatus !== 'granted') {
      Alert.alert("Permission Required", "Please enable notifications in settings to use reminders.");
      return false;
    }

    // Android Channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    // Schedule 12:00 PM
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Expense Check! 💰",
        body: "Time to log your spendings for today.",
        sound: 'default',
      },
      trigger: {
        hour: 12,
        minute: 0,
        repeats: true, // Legacy compatibility
        type: Notifications.SchedulableTriggerInputTypes.DAILY, 
      },
    });
    return true;
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold mb-8">Settings</Text>

      {/* Biometric Lock Row */}
      <View className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm mb-4">
        <View>
          <Text className="text-lg font-semibold">Biometric Lock</Text>
          <Text className="text-gray-500">Secure your expenses.</Text>
        </View>
        <Switch 
          value={isLockEnabled} 
          onValueChange={(val) => toggleLock(val)}
          trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
        />
      </View>

      {/* --- NEW: Daily Reminder Row --- */}
      <View className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm">
        <View>
          <Text className="text-lg font-semibold">Daily Reminder</Text>
          <Text className="text-gray-500">Notify me daily at 12 PM</Text>
        </View>
        <Switch 
          value={isReminderEnabled} 
          onValueChange={toggleReminder}
          trackColor={{ false: "#d1d5db", true: "#10b981" }} // Green for reminders
        />
      </View>
    </View>
  );
}