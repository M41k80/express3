// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navegation/AppNavegator';
import { AuthProvider } from './context/AuthContext';
import { useFonts } from 'expo-font';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3CA464" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
