import { Image, StyleSheet, ScrollView, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CALCULADORA PARA ESTADISTICA DESCRIPTIVA</Text>
      <Image source={require('@/assets/images/tercera.png')} style={styles.image} />
      <View style={styles.iconContainer}>
        <FontAwesome5 name="calculator" size={40} color="blue" />
        <FontAwesome5 name="chart-bar" size={40} color="green" />
        <FontAwesome5 name="percentage" size={40} color="orange" />
        <FontAwesome5 name="square-root-alt" size={40} color="red" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  image: {
    width: 850,
    height: 450,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
