import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';

const { width: initialWidth } = Dimensions.get('window');

// Define the drawer routes
type RootDrawerParamList = {
  tabs: undefined;
  calculadoraFinita: undefined;
  calculadoraInfinita: undefined;
  calculadoraMedia: undefined;
  calculadoraModa: undefined;
  calculadoraDesviacionEstandar: undefined;
  calculadoraMediana: undefined;
  formulasEstaisticas: undefined;
  calculadoraGeneral: undefined;
};

const Calculator = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  // Adjust width for web responsiveness
  const maxWidth = Platform.OS === 'web' ? Math.min(initialWidth, 600) : initialWidth;
  const buttonSize = maxWidth * 0.9 / 4 - 10; // Base button size on adjusted width

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleNumberPress = (num: string) => {
    if (display === '0' || operation === '=') {
      setDisplay(num);
      if (operation === '=') setOperation(null);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationPress = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setDisplay('0');
      setOperation(op);
    } else if (operation && operation !== '=') {
      const result = calculate(previousValue, parseFloat(display), operation);
      setPreviousValue(result);
      setDisplay('0');
      setOperation(op);
    } else {
      setOperation(op);
      setDisplay('0');
    }
  };

  const handleEqualsPress = () => {
    if (previousValue !== null && operation && operation !== '=') {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation('=');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : NaN;
      case '^': return Math.pow(a, b);
      case '%': return a - (a * b) / 100;
      default: return b;
    }
  };

  const handleSpecialFunction = (func: string) => {
    const current = parseFloat(display);
    switch (func) {
      case '√':
        if (current >= 0) setDisplay(Math.sqrt(current).toString());
        break;
      case '!':
        if (Number.isInteger(current) && current >= 0) {
          let result = 1;
          for (let i = 2; i <= current; i++) result *= i;
          setDisplay(result.toString());
        }
        break;
      case 'AC':
        setDisplay('0');
        break;
      default:
        break;
    }
    setOperation(null);
    setPreviousValue(null);
  };

  const buttons = [
    ['AC', 'C', '!', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '%', '^'],
    ['√', '=', '', ''],
  ];

  return (
    <View style={[styles.container, { maxWidth: Platform.OS === 'web' ? 600 : '100%' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="calculator-variant" size={28} color="#2196F3" style={styles.titleIcon} />
          <Text style={styles.title}>CALCULADORA</Text>
        </View>
      </View>

      {/* Calculator Display */}
      <View style={[styles.displayContainer, { width: maxWidth * 0.9 }]}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      {/* Calculator Buttons */}
      <View style={[styles.buttonContainer, { width: maxWidth * 0.9 }]}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button, colIndex) => (
              button ? (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.button,
                    { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
                    button === '=' && styles.equalsButton,
                    ['+', '-', '×', '÷', '^', '%', '√', '!'].includes(button) && styles.operatorButton,
                    ['AC', 'C'].includes(button) && styles.clearButton,
                  ]}
                  onPress={() => {
                    if (button.match(/[0-9.]/)) handleNumberPress(button);
                    else if (button === '=') handleEqualsPress();
                    else if (['AC', '√', '!'].includes(button)) handleSpecialFunction(button);
                    else if (button === 'C') handleClear();
                    else handleOperationPress(button);
                  }}
                >
                  {button === '√' ? (
                    <MaterialCommunityIcons name="square-root" size={24} color="#fff" />
                  ) : button === '!' ? (
                    <MaterialCommunityIcons name="numeric" size={24} color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>{button}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <View key={`${rowIndex}-${colIndex}`} style={{ width: buttonSize, height: buttonSize }} />
              )
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingVertical: 20,
    alignSelf: 'center', // Center on web
    width: '100%',
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
  displayContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 80,
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 36,
    color: '#000',
    textAlign: 'right',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  operatorButton: {
    backgroundColor: 'orange',
  },
  clearButton: {
    backgroundColor: '#0cf236',
  },
  equalsButton: {
    width: (initialWidth * 0.9) / 1 - 70, // Fixed for web responsiveness below
    backgroundColor: '#0cf236',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
});

export default Calculator;