import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BlockMath } from "react-katex";

const CompactCalculator = () => {
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [marginError, setMarginError] = useState("");
  const [sampleSize, setSampleSize] = useState(0);

  const zScores = { 90: 1.645, 95: 1.96, 99: 2.576 };

  const handleNumberPress = (num) => {
    setMarginError(prev => prev + num);
  };

  const handleClear = () => {
    setMarginError("");
    setSampleSize(0);
  };

  const calculateSampleSize = () => {
    if (!confidenceLevel || !marginError) return;
    
    const z = zScores[confidenceLevel];
    const e = Number(marginError) / 100;
    const p = 0.5;

    const numerator = Math.pow(z, 2) * p * (1 - p);
    const denominator = Math.pow(e, 2);
    const sample = numerator / denominator;

    setSampleSize(Math.round(sample));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.calculatorContainer}>
        {/* Pantalla superior con fórmulas y resultado */}
        <View style={styles.screen}>
          <Text style={styles.title}>POBLACION INFINITA</Text>
          <BlockMath math={`n = \\frac{Z^2 \\cdot p \\cdot (1 - p)}{i^2}`} />
          <BlockMath 
            math={`n = \\frac{${zScores[confidenceLevel]}^2 \\cdot 0.5 \\cdot 0.5}{(${marginError || "i"}/100)^2}`} 
          />
          <Text style={styles.result}>{sampleSize || "0"}</Text>
        </View>

        {/* Fila compacta con nivel de confianza y margen de error */}
        <View style={styles.compactRow}>
          {/* Nivel de confianza */}
          <View style={styles.confidenceContainer}>
            <Text style={styles.smallLabel}>Confianza:</Text>
            <Picker
              selectedValue={confidenceLevel}
              onValueChange={(val) => setConfidenceLevel(val)}
              style={styles.compactPicker}
              dropdownIconColor="#FFF"
              mode="dropdown"
            >
              <Picker.Item label="90%" value={90} />
              <Picker.Item label="95%" value={95} />
              <Picker.Item label="99%" value={99} />
            </Picker>
          </View>

          {/* Margen de error */}
          <View style={styles.marginContainer}>
            <Text style={styles.smallLabel}>Margen (%):</Text>
            <View style={styles.displayContainer}>
              <Text style={styles.displayText}>{marginError || "0"}</Text>
            </View>
          </View>
        </View>

        {/* Teclado numérico */}
        <View style={styles.keypad}>
          <View style={styles.row}>
            {[1, 2, 3].map(num => (
              <TouchableOpacity 
                key={num} 
                style={styles.numberButton}
                onPress={() => handleNumberPress(num.toString())}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[4, 5, 6].map(num => (
              <TouchableOpacity 
                key={num} 
                style={styles.numberButton}
                onPress={() => handleNumberPress(num.toString())}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            {[7, 8, 9].map(num => (
              <TouchableOpacity 
                key={num} 
                style={styles.numberButton}
                onPress={() => handleNumberPress(num.toString())}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.numberButton, { backgroundColor: "#FF5252" }]}
              onPress={handleClear}
            >
              <Text style={styles.numberText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.numberButton}
              onPress={() => handleNumberPress("0")}
            >
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.numberButton, { backgroundColor: "#4CAF50" }]}
              onPress={calculateSampleSize}
            >
              <Text style={styles.numberText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: "#121212",  // Fondo oscuro intenso
      paddingVertical: 20,
    },
    calculatorContainer: {
      backgroundColor: "#1E1E1E",  // Gris oscuro con tono azulado
      borderRadius: 20,
      padding: 15,
      width: "50%",
      alignSelf: "center",
      shadowColor: "#FF6B00",      // Sombra naranja vibrante
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: "#3A3A3A",     // Borde sutil
    },
    screen: {
      backgroundColor: "#FFFFFF",  // Blanco puro
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#E0E0E0",     // Borde sutil
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#00E676",          // Verde neón vibrante
      textAlign: "center",
      marginBottom: 10,
      textShadowColor: "rgba(0, 230, 118, 0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    result: {
      fontSize: 35,
      fontWeight: "bold",
      color: "#2979FF",          // Azul brillante
      textAlign: "right",
      marginTop: 10,
    },
    compactRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    confidenceContainer: {
      width: "55%",
    },
    marginContainer: {
      width: "40%",
    },
    smallLabel: {
      color: "#FFD600",          // Amarillo vibrante
      fontSize: 16,
      marginBottom: 5,
      fontWeight: '600',
    },
    compactPicker: {
      backgroundColor: "#3700B3", // Azul oscuro vibrante
      color: "#FFFFFF",
      borderRadius: 8,
      height: 40,
    },
    displayContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 10,
      height: 40,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#E0E0E0",
    },
    displayText: {
      color: "#D50000",          // Rojo vibrante
      fontSize: 18,
      textAlign: "right",
      fontWeight: "bold",
    },
    keypad: {
      marginTop: 0,
      backgroundColor: "#1E1E1E", // Fondo oscuro para el teclado
      borderRadius: 10,
      padding: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    numberButton: {
      backgroundColor: "#6200EE", // Púrpura vibrante
      borderRadius: 8,
      width: "30%",
      aspectRatio: 5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#BB86FC",     // Borde púrpura claro
      shadowColor: "#BB86FC",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    numberText: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
      textShadowColor: "rgba(255, 255, 255, 0.3)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });

export default CompactCalculator;