import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MathJax from 'react-native-mathjax';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define el tipo de las rutas del drawer
type RootDrawerParamList = {
  tabs: undefined;
  calculadoraFinita: undefined;
  calculadoraInfinita: undefined;
  calculadoraMedia: undefined;
  calculadoraModa: undefined;
  calculadoraDesviacionEstandar: undefined;
  calculadoraMediana: undefined;
  formulasEstaisticas: undefined;
};

const mmlOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/CommonHTML'],
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
  },
};

const FormulasEstadistica = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado con el botón de menú y el título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" /> {/* Color blanco para el ícono */}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="math-compass" size={28} color="#2196F3" style={styles.titleIcon} />
          <Text style={styles.title}>FÓRMULAS ESTADÍSTICAS</Text>
        </View>
      </View>

      {/* Contenido de las fórmulas */}
      <View style={styles.content}>
        {/* Tamaño de Muestra - Población Infinita */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Tamaño de Muestra (Población Infinita)</Text>
          <MathJax
            style={styles.formula}
            mathJaxOptions={mmlOptions}
            html={`\\(n = \\frac{Z^2 \\cdot p \\cdot (1 - p)}{e^2}\\)`}
          />
        </View>

        {/* Tamaño de Muestra - Población Finita */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Tamaño de Muestra (Población Finita)</Text>
          <MathJax
            style={styles.formula}
            mathJaxOptions={mmlOptions}
            html={`\\(n = \\frac{N \\cdot Z^2 \\cdot p \\cdot (1 - p)}{e^2 \\cdot (N - 1) + Z^2 \\cdot p \\cdot (1 - p)}\\)`}
          />
        </View>

        {/* Media (Mean) */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Media</Text>
          <MathJax
            style={styles.formula}
            mathJaxOptions={mmlOptions}
            html={`\\(\\bar{x} = \\frac{1}{N} \\cdot \\sum_{i=1}^{N} x_i\\)`}
          />
        </View>

        {/* Moda (Mode) */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Moda</Text>
          <Text style={styles.formulaText}>Datos \(x_i\) más repetidos.</Text>
        </View>

        {/* Mediana (Median) */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Mediana</Text>
          <View>
            <MathJax
              style={styles.formula}
              mathJaxOptions={mmlOptions}
              html={`\\(x_{\\frac{N+1}{2}} \\quad \\text{si } N \\text{ es impar}\\)`}
            />
            <MathJax
              style={styles.formula}
              mathJaxOptions={mmlOptions}
              html={`\\(\\frac{1}{2} \\left( x_{\\frac{N}{2}} + x_{\\frac{N}{2}+1} \\right) \\quad \\text{si } N \\text{ es par}\\)`}
            />
          </View>
        </View>

        {/* Desviación Estándar (Standard Deviation) */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Desviación Estándar</Text>
          <MathJax
            style={styles.formula}
            mathJaxOptions={mmlOptions}
            html={`\\(\\sigma = \\sqrt{\\frac{\\sum_{i=1}^{N} (x_i - \\bar{x})^2}{N}}\\)`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a', // Fondo negro
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff', // Letras blancas
    letterSpacing: 1,
    textAlign: 'center',
  },
  content: {
    width: width * 0.9, // Ajustar el ancho del contenido
    alignSelf: 'center', // Centrar el contenido
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#2a2a2a', // Fondo gris oscuro para las tarjetas
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2, // Borde azul
    borderColor: '#2196F3', // Color azul
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Letras blancas
    marginBottom: 5,
  },
  formula: {
    fontSize: 18,
    marginVertical: 5,
    color: '#fff', // Letras blancas (aunque MathJax puede ignorar esto)
  },
  formulaText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff', // Letras blancas
  },
});

export default FormulasEstadistica;