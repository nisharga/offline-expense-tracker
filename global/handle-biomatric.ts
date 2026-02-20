import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const handleBiometricAuth = async (onSuccess: () => void) => {
  try {
    // 1. Check if the hardware supports biometrics
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      return Alert.alert('Error', 'This device does not support biometrics.');
    }

    // 2. Check if the user has enrolled any fingerprints or FaceID
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      return Alert.alert('Not Enrolled', 'No biometrics found. Please set up FaceID/Fingerprint in settings.');
    }

    // 3. Trigger the authentication prompt
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to view your expenses',
      fallbackLabel: 'Enter Passcode', // If biometrics fail
      disableDeviceFallback: false,
    });

    if (result.success) {
      onSuccess();
    } else {
      Alert.alert('Authentication Failed', 'Please try again.');
    }
  } catch (error) {
    console.error(error);
  }
};