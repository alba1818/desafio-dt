import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SensorItem({ sensor, onPress }) {
  if (!sensor) return null;

  let dataFormatada = 'Sem data';
  if (sensor.timestamp) {
    const date = new Date(sensor.timestamp);
    if (!isNaN(date)) dataFormatada = date.toLocaleString();
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{sensor.sensorId || 'Sem ID'}</Text>
      <Text>Valor: {sensor.sensorValue ?? 'Sem valor'}</Text>
      <Text>Data: {dataFormatada}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});
