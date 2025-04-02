import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#333',
            width: 250,
          },
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            marginLeft: 20,
            fontSize: 16,
          },
          headerShown: false,
        }}>
      <Drawer.Screen
          name="tabs"
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerItemStyle: { display: 'none' },
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
      <Drawer.Screen
        name="FormulasEstadisticaDescriptiva"
        options={{
          title: 'Formulario',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />
          ),
        }}
      />
     <Drawer.Screen
          name="calculadoraFinita"
          options={{
            drawerLabel: 'Población Finita',
            title: 'Calculadora Población Finita',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-group" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="calculadoraInfinita"
          options={{
            drawerLabel: 'Población Infinita',
            title: 'Calculadora Población Infinita',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="infinity" size={24} color={color} />
            ),
          }}
        />
       <Drawer.Screen
          name="calculadoraMedia"
          options={{
            drawerLabel: 'Media',
            title: 'Media',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="calculator" size={24} color={color} />
            ),
          }}
        />
     
       <Drawer.Screen
          name="calculadoraDesviacionEstandar"
          options={{
            drawerLabel: 'Desviación Estándar',
            title: 'Calculadora de Desviación Estándar',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="chart-line-variant" size={24} color={color} />
            ),
          }}
        />
     <Drawer.Screen
          name="calculadoraMediana"
          options={{
            drawerLabel: 'Mediana',
            title: ' Mediana',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="function"  size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="moda-y-media"
          options={{
            drawerLabel: 'Juego de formulas',
            title: 'Media y Moda',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="gamepad-variant" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="calculadoraNatural"
          options={{
            drawerLabel: 'Calculadora Estandar',
            title: 'calculadoraNatural',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="calculator" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
