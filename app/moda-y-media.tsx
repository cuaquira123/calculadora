import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

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

const { width } = Dimensions.get('window');

const GameEstadistica = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const [kicks, setKicks] = useState<number[]>([]);
  const [kickCount, setKickCount] = useState(1);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      .catch(error => console.log('Error locking orientation:', error));
  }, []);

  const openDrawer = () => navigation.openDrawer();

  const kickBall = () => {
    if (kickCount <= 9) {
      const distance = Math.floor(Math.random() * 15) + 1;
      setKicks(prevKicks => [...prevKicks, distance]);
      setKickCount(prevCount => prevCount + 1);
      setIsSorted(false);
    }
  };

  const resetGame = () => {
    setKicks([]);
    setKickCount(1);
    setIsSorted(false);
  };

  const sortData = () => {
    if (kicks.length > 0) {
      setKicks([...kicks].sort((a, b) => a - b));
      setIsSorted(true);
    }
  };

  const calculateMean = () => {
    if (kicks.length === 0) return '0';
    return (kicks.reduce((acc, curr) => acc + curr, 0) / kicks.length).toFixed(1);
  };

  const calculateMode = () => {
    if (kicks.length === 0) return 'N/A';
    const frequency: { [key: number]: number } = {};
    let maxFreq = 0;
    let mode: number[] = [];

    kicks.forEach((distance) => {
      frequency[distance] = (frequency[distance] || 0) + 1;
      if (frequency[distance] > maxFreq) {
        maxFreq = frequency[distance];
        mode = [distance];
      } else if (frequency[distance] === maxFreq) {
        mode.push(distance);
      }
    });

    if (mode.length === kicks.length && maxFreq === 1) return 'N/A';
    return mode.sort((a, b) => a - b).join(', ');
  };

  const calculateMedian = (): string => {
    if (kicks.length === 0) return "0";
    const sortedKicks = [...kicks].sort((a, b) => a - b);
    const mid = Math.floor(sortedKicks.length / 2);
    return sortedKicks.length % 2 === 0
      ? ((sortedKicks[mid - 1] + sortedKicks[mid]) / 2).toFixed(1)
      : sortedKicks[mid].toFixed(1);
  };

  const renderLinePlot = () => {
    const plotPoints: JSX.Element[] = [];
    const displayKicks = [...kicks];

    const frequency: { [key: number]: number } = {};
    displayKicks.forEach(distance => {
      frequency[distance] = (frequency[distance] || 0) + 1;
    });

    for (let i = 1; i <= 15; i++) {
      const balls: JSX.Element[] = [];
      const count = frequency[i] || 0;

      for (let j = 0; j < count; j++) {
        balls.push(
          <MaterialCommunityIcons
            key={`${i}-${j}`}
            name="soccer"
            size={20}
            color={isSorted ? '#2196F3' : '#000'}
            style={{
              position: 'relative',
              top: isSorted ? j * -22 : j * 22,
            }}
          />
        );
      }

      plotPoints.push(
        <View 
          key={i} 
          style={[
            styles.plotPoint,
            { 
              justifyContent: isSorted ? 'flex-start' : 'flex-end',
              height: '100%',
            }
          ]}
        >
          {balls}
        </View>
      );
    }

    return plotPoints;
  };

  const renderStatLines = () => {
    if (kicks.length === 0) return null;
    
    const plotWidth = width * 0.9 - 20;
    const mean = parseFloat(calculateMean());
    const median = parseFloat(calculateMedian());
    
    return (
      <>
        {/* Línea de la Media */}
        <View style={[styles.meanLine, { left: (mean / 15) * plotWidth }]}>
          <Text style={styles.meanLabel}>Media = {mean}</Text>
        </View>
        
        {/* Línea de la Mediana */}
        <View style={[styles.medianLine, { left: (median / 15) * plotWidth }]}>
          <Text style={styles.medianLabel}>Mediana = {median}</Text>
        </View>
      </>
    );
  };

  const renderSoccerField = () => {
    const frequency: { [key: number]: number } = {};
    kicks.forEach(distance => {
      frequency[distance] = (frequency[distance] || 0) + 1;
    });

    const uniquePositions: JSX.Element[] = [];
    for (let distance = 1; distance <= 15; distance++) {
      if (frequency[distance]) {
        const count = frequency[distance];
        uniquePositions.push(
          <View
            key={distance}
            style={[styles.soccerBallContainer, { left: (distance / 15) * (width * 0.8) }]}
          >
            <MaterialCommunityIcons
              name="soccer"
              size={30}
              color="#fff"
            />
            {count > 1 && (
              <Text style={styles.overlapCount}>{count}</Text>
            )}
          </View>
        );
      }
    }
    return uniquePositions;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="soccer" size={28} color="#2196F3" style={styles.titleIcon} />
          <Text style={styles.title}>JUEGO DE ESTADÍSTICA</Text>
        </View>
      </View>

      <View style={styles.plotContainer}>
  {/* Media con estilo verde */}
  <Text style={[styles.statsText, styles.meanText]}>Media: {calculateMean()} m</Text>
  
  {/* Moda con estilo azul */}
  <Text style={[styles.statsText, styles.modeText]}>Moda: {calculateMode()} m</Text>
  
  {/* Mediana con estilo naranja */}
  <Text style={[styles.statsText, styles.medianText]}>Mediana: {calculateMedian()} m</Text>
        <View style={styles.plot}>
          {renderLinePlot()}
          {renderStatLines()}
        </View>
        <View style={styles.plotLabels}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <Text key={num} style={styles.plotLabel}>{num}</Text>
          ))}
        </View>
        <Text style={styles.plotAxisLabel}>Distancia (metros)</Text>
      </View>

      <View style={styles.controlButtons}>
        <TouchableOpacity
          style={[styles.controlButton, isSorted && styles.controlButtonActive]}
          onPress={sortData}
          disabled={kicks.length === 0}
        >
          <Text style={styles.controlButtonText}>Ordenar Datos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.kickButtons}>
          <TouchableOpacity style={styles.kickButton} onPress={kickBall} disabled={kickCount > 9}>
            <Text style={styles.kickButtonText}>Patear (Patada {kickCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.kickCount}>Patadas: {kicks.length}</Text>
        
        <ImageBackground 
            source={require('@/assets/images/soccer.png')}
            style={styles.soccerField}
            resizeMode="cover"
        >
          {renderSoccerField()}
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  plotContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  
  // Estilo específico para la Media
  meanText: {
    color: '#4CAF50',  // Verde
    backgroundColor: '#E8F5E9', // Fondo verde claro
    padding: 3,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32', // Borde izquierdo verde oscuro
  },

  // Estilo específico para la Moda
  modeText: {
    color: '#2196F3',  // Azul
    backgroundColor: '#E3F2FD', // Fondo azul claro
    padding: 3,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1565C0', // Borde izquierdo azul oscuro
  },

  // Estilo específico para la Mediana
  medianText: {
    color: '#FF9800',  // Naranja
    backgroundColor: '#FFF3E0', // Fondo naranja claro
    padding: 3,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF6C00', // Borde izquierdo naranja oscuro
  },
  plot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    borderBottomWidth: 1,
    borderColor: '#000',
    position: 'relative',
    marginVertical: 10,
  },
  plotPoint: {
    width: '6.66%',
    alignItems: 'center',
  },
  medianLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(230, 173, 15, 0.8)', // Azul
  },
  medianLabel: {
    position: 'absolute',
    top: -25,
    left: -40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderRadius: 3,
  },
  meanLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(114, 243, 68, 0.8)', // Verde
  },
  meanLabel: {
    position: 'absolute',
    top: -25,
    left: -40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 2,
    borderRadius: 3,
  },
  plotLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  plotLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    width: '6.66%',
    textAlign: 'center',
  },
  plotAxisLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 1,
    alignSelf: 'center',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#4CAF50',
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameArea: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  kickButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  kickButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    elevation: 3,
  },
  kickButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  kickCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(10, 239, 75, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  soccerField: {
    height: 120,
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2E7D32',
    justifyContent: 'flex-end',
  },
  soccerBallContainer: {
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
  },
  overlapCount: {
    position: 'absolute',
    top: -15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    borderRadius: 15,
  },
});

export default GameEstadistica;