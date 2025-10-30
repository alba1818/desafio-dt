// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SensorListScreen from '../screens/SensorListScreen';
import SensorDetailScreen from '../screens/SensorDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import { navigationRef } from './navigationRef';

export type Sensor = {
  id: string;
  nome: string;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Sensores: undefined;
  Detalhe: { sensor: Sensor };
  Configuracoes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        // ✅ Aqui tipamos os props corretamente:
        component={(props: NativeStackScreenProps<RootStackParamList, 'Login'>) => (
          <LoginScreen {...props} onLoginSuccess={() => navigationRef.navigate('Sensores')} />
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Sensores" component={SensorListScreen} />
      <Stack.Screen name="Detalhe" component={SensorDetailScreen} />
      <Stack.Screen name="Configuracoes" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;