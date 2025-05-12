import React, { useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import SensorItem from '../components/SensorItem';
import { fetchSensoresMock } from '../utils/api';

export default function SensorListScreen({ navigation }) {
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    fetchSensoresMock().then(setSensores);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sensores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SensorItem sensor={item} onPress={() => navigation.navigate('Detalhe', { sensor: item })} />
        )}
      />
      <Button title="Configurações" onPress={() => navigation.navigate('Configurações')} />
    </View>
  );
}
