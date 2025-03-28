import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
        <Tabs.Screen
        name="FormulasEstadisticaDescriptiva"
        options={{
          title: 'Formulario',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sigma" size={28} color={color} />
        ),
        }}
      />
      <Tabs.Screen
        name="calculadoraFinita"
        options={{
          title: 'Poblacion finita',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator" size={28} color={color} />
        ),
        }}
      />
       <Tabs.Screen
        name="calculadoraInfinita"
        options={{
          title: 'Poblacion Infinita',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator" size={28} color={color} />
        ),
        }}
      />
    </Tabs>
  );
}
