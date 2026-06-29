import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Lora_400Regular,
  Lora_400Regular_Italic,
  Lora_500Medium,
} from '@expo-google-fonts/lora';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  NotoSerifJP_400Regular,
  NotoSerifJP_500Medium,
  NotoSerifJP_700Bold,
} from '@expo-google-fonts/noto-serif-jp';
import { KomorebiProvider } from '../context/KomorebiContext';
import { brand } from '../constants/colors';

export default function RootLayout() {
  const [loaded] = useFonts({
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    NotoSerifJP_400Regular,
    NotoSerifJP_500Medium,
    NotoSerifJP_700Bold,
  });

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={brand.matcha} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <KomorebiProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom', animationDuration: 320 }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="placement" />
          <Stack.Screen name="placement-exam" />
          <Stack.Screen name="placement-result" />
          <Stack.Screen name="genres" />
          <Stack.Screen name="app-main" />
          <Stack.Screen name="story" />
        </Stack>
      </KomorebiProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brand.washi,
  },
});
