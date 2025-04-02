import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Active icon/text color
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault, // Inactive icon/text color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 60, // Increased height for better visibility
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f0f0f0', // Solid background for contrast
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#ccc', // Subtle border for definition
          paddingBottom: Platform.OS === 'ios' ? 10 : 5, // Adjust padding for iOS safe area
          paddingTop: 5, // Add top padding for balance
        },
        tabBarLabelStyle: {
          fontSize: 12, // Ensure label is readable
          fontWeight: '600', // Bold for better visibility
          marginBottom: 5, // Space between label and bottom
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculadoraFinita"
        options={{
          title: 'Finita',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadoraInfinita"
        options={{
          title: 'Infinita',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="infinity" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadoraDesviacionEstandar"
        options={{
          title: 'Desviación Estándar', // Fixed typo in title for consistency
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-line-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadoraMedia"
        options={{
          title: 'Media',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadoraMediana"
        options={{
          title: 'Mediana',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="function" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadoraModa"
        options={{
          title: 'Moda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}