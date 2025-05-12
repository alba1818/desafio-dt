import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function SensorItem({ sensor, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{sensor.nome}</Text>
      <Text>Valor: {sensor.valor}</Text>
      <Text>Status: {sensor.status}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold' },
});
