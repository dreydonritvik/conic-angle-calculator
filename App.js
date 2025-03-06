import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity, BackHandler } from 'react-native';

export default function App() {
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [bottomInput, setBottomInput] = useState('');
  const [result, setResult] = useState('');

  const calculateTangent = () => {
    const left = parseFloat(leftInput);
    const right = parseFloat(rightInput);
    const bottom = parseFloat(bottomInput);

    if (isNaN(left) || isNaN(right) || isNaN(bottom)) {
      Alert.alert('Hata', 'Lütfen tüm bilgileri doğru şekilde girin.');
      return;
    }
    
    if (bottom === 0) {
      Alert.alert('Hata', 'Tornalacak boy 0 olamaz!');
      return;
    }

    const tangent = (left - right) / (2 * bottom);

    const radians = Math.atan(tangent);
    const degrees = radians * (180 / Math.PI);
    const rawMinutes = (degrees % 1) * 60;
    const roundedMinutes = Math.round(rawMinutes);

    setResult(
      `${Math.floor(degrees)} Derece ${Math.abs(roundedMinutes)} Dakika`
    );
  };

  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={exitApp}>
        <Text style={styles.exitButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.description}>Bu program Konik'in tanjantını hesaplar.</Text>
      <Text style={styles.details}>D: Konik'in büyük çapı</Text>
      <Text style={styles.details}>d: Konik'in küçük çapı</Text>
      <Text style={styles.details}>L: Tornalanacak boy</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.leftInput]}
          placeholder="?"
          value={leftInput}
          onChangeText={setLeftInput}
          keyboardType='numeric'
        />
        <Text style={styles.leftInput}>D</Text>
        <Image
          style={styles.image}
          source={require('./assets/conic-wb.png')}
        />
        <Text style={styles.rightInput}>d</Text>
        <TextInput
          style={[styles.input, styles.rightInput]}
          placeholder="?"
          value={rightInput}
          onChangeText={setRightInput}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.bottomInputContainer}>
        <Text>L</Text>
        <TextInput
          style={[styles.input, styles.bottomInput]}
          placeholder="?"
          value={bottomInput}
          onChangeText={setBottomInput}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Hesapla" onPress={calculateTangent} />
      </View>
      {result !== '' && <Text style={styles.resultDesc}>Tornanın Sport'una Verilecek Açı: </Text>}
      {result !== '' && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff6666',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    color: 'red',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop: 15,
    marginBottom: -20,
    width: 220,
    height: 150,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'lightcyan',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    width: 50,
    textAlign: 'center',
  },
  leftInput: {
    marginTop: 20,
    padding: 5,
  },
  rightInput: {
    marginTop: 20,
    padding: 5,
  },
  bottomInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomInput: {
    width: 150,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 20,
  },
  resultDesc: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  result: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkorange',
  },
});
