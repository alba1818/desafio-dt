import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from '../services/api';

// Tipagem dos sensores
type Sensor = {
  id: string;
  nome: string;
  valor: number;
  status: 'OK' | 'Alerta';
  historico: number[];
};

type ReadingFromAPI = {
  id: number;
  sensorId: string;
  readingValue: number;
  timestamp: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sensores'>;

export default function SensorListScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutBotao}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair.');
    }
  };

  useEffect(() => {
    const carregarSensores = async () => {
      try {
        const api = await getApi();
        const response = await api.get<ReadingFromAPI[]>('/readings');
        const dados = response.data;

        const sensoresMap = new Map<string, Sensor>();

        dados.forEach((leitura) => {
          const id = leitura.sensorId;
          const sensorExistente = sensoresMap.get(id);

          if (sensorExistente) {
            sensorExistente.historico.push(leitura.readingValue);
            sensorExistente.valor = leitura.readingValue;
          } else {
            sensoresMap.set(id, {
              id: id,
              nome: id,
              valor: leitura.readingValue,
              status: leitura.readingValue > 30 ? 'Alerta' : 'OK',
              historico: [leitura.readingValue],
            });
          }
        });

        setSensores(Array.from(sensoresMap.values()));
      } catch (error) {
        console.error('Erro ao buscar sensores do backend:', error);
        Alert.alert('Erro', 'Não foi possível buscar os sensores.');
      }
    };

    carregarSensores();
  }, []);

  const handlePress = (sensor: Sensor) => {
    navigation.navigate('Detalhe', { sensor });
  };

  const renderItem = ({ item }: { item: Sensor }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.item}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.valor}>Valor: {item.valor}</Text>
        <Text style={item.status === 'OK' ? styles.ok : styles.alerta}>
          Status: {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Sensores</Text>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  valor: { fontSize: 16 },
  ok: { fontSize: 16, color: 'green' },
  alerta: { fontSize: 16, color: 'red' },
  logoutBotao: {
    color: 'red',
    marginRight: 12,
    fontWeight: 'bold',
  },
});
