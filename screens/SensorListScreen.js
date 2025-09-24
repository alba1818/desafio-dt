import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import SensorItem from '../components/SensorItem';
import { fetchSensores, getApiBaseUrl } from '../utils/api';

export default function SensorListScreen({ navigation }) {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarSensores = async () => {
    setLoading(true);
    try {
      const data = await fetchSensores();
      setSensores(data);
    } catch (err) {
      console.error('Erro ao buscar sensores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSensores();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SensorItem
            sensor={item}
            onPress={() => navigation.navigate('Detalhe', { sensor: item })}
          />
        )}
        ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum sensor encontrado</Text>}
      />
      <Button title="Configurações" onPress={() => navigation.navigate('Configurações')} />
    </View>
  );
}
