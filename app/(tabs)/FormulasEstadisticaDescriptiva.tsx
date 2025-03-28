import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BlockMath } from "react-katex";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FormulasEstadisticaDescriptiva = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Título con ícono */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="sigma" size={28} color="#FF0000" />
          <Text style={styles.mainTitle}> FÓRMULAS ESTADÍSTICAS</Text>
        </View>

        {/* --- Sección: Población Finita/Infinita --- */}
        <Text style={styles.sectionTitle}>1. Tamaño de Muestra (Población Finita/Infinita)</Text>

        <Text style={styles.formulaTitle}>Población Finita</Text>
        <BlockMath 
          math="n = \frac{N \cdot Z^2 \cdot p \cdot q}{e^2 (N-1) + Z^2 \cdot p \cdot q}" 
        />
        <Text style={styles.formulaDescription}>
          - N: Tamaño de la población{"\n"}
          - Z: Valor Z (1.96 para 95% confianza){"\n"}
          - p y q: Proporción estimada y su complemento (0.5 si no se conoce){"\n"}
          - e: Margen de error (ej. 0.05)
        </Text>

        <Text style={styles.formulaTitle}>Población Infinita</Text>
        <BlockMath 
          math="n = \frac{Z^2 \cdot p \cdot q}{e^2}" 
        />
        <Text style={styles.formulaDescription}>
          Usar cuando N es desconocido o muy grande.
        </Text>

        {/* --- Sección: Medidas de Tendencia Central --- */}
        <Text style={styles.sectionTitle}>2. Medidas de Tendencia Central</Text>

        <Text style={styles.formulaTitle}>Media Aritmética</Text>
        <BlockMath math="\bar{X} = \frac{\sum_{i=1}^{n} X_i}{n}" />

        <Text style={styles.formulaTitle}>Mediana</Text>
        <Text style={styles.formulaDescription}>
          - Datos impares: Valor central{"\n"}
          - Datos pares: Promedio de los dos valores centrales
        </Text>

        <Text style={styles.formulaTitle}>Moda</Text>
        <Text style={styles.formulaDescription}>Valor más frecuente en el conjunto.</Text>

        {/* --- Sección: Medidas de Dispersión --- */}
        <Text style={styles.sectionTitle}>3. Medidas de Dispersión</Text>

        <Text style={styles.formulaTitle}>Rango</Text>
        <BlockMath math="R = X_{\text{máx}} - X_{\text{mín}}" />

        <Text style={styles.formulaTitle}>Varianza (Poblacional)</Text>
        <BlockMath math="\sigma^2 = \frac{\sum (X_i - \mu)^2}{N}" />

        <Text style={styles.formulaTitle}>Varianza (Muestral)</Text>
        <BlockMath math="s^2 = \frac{\sum (X_i - \bar{X})^2}{n-1}" />

        <Text style={styles.formulaTitle}>Desviación Estándar</Text>
        <BlockMath math="\sigma = \sqrt{\sigma^2}, \quad s = \sqrt{s^2}" />

        <Text style={styles.formulaTitle}>Coeficiente de Variación</Text>
        <BlockMath math="CV = \left(\frac{s}{\bar{X}}\right) \times 100\%" />

        {/* --- Sección: Medidas de Posición --- */}
        <Text style={styles.sectionTitle}>4. Medidas de Posición</Text>

        <Text style={styles.formulaTitle}>Cuartiles (Q1, Q2, Q3)</Text>
        <BlockMath math="P_k = \frac{k(n+1)}{4}" />

        <Text style={styles.formulaTitle}>Percentiles</Text>
        <BlockMath math="P_p = \text{Valor en la posición } \frac{p(n+1)}{100}" />

        {/* --- Sección: Asimetría y Correlación --- */}
        <Text style={styles.sectionTitle}>5. Asimetría y Correlación</Text>

        <Text style={styles.formulaTitle}>Coeficiente de Asimetría de Pearson</Text>
        <BlockMath math="A_s = \frac{3(\bar{X} - \text{Mediana})}{s}" />

        <Text style={styles.formulaTitle}>Covarianza</Text>
        <BlockMath math="\text{Cov}(X,Y) = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{n-1}" />

        <Text style={styles.formulaTitle}>Coeficiente de Pearson</Text>
        <BlockMath math="r = \frac{\text{Cov}(X,Y)}{s_X s_Y}" />
      </View>
    </ScrollView>
  );
};

// Estilos (igual que antes)
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    padding: 20,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#FF0000",
    textDecorationLine: "underline",
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FF0000",
  },
  formulaDescription: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
    fontStyle: "italic",
  },
});

export default FormulasEstadisticaDescriptiva;