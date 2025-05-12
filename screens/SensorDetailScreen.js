import React, { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
import { fetchSensorHistorico } from '../utils/api';

export default function SensorDetailScreen({ route }) {
  const { sensor } = route.params;
  const [historico, setHistorico] = useState(sensor.historico || []);

  const atualizar = async () => {
    const novoHistorico = await fetchSensorHistorico(sensor.id);
    setHistorico(novoHistorico);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{sensor.nome}</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={Dimensions.get('window').width - 20}
          height={220}
        >
          <VictoryLine
            data={historico.map((v, i) => ({ x: i + 1, y: v }))}
            style={{
              data: { stroke: "#007AFF", strokeWidth: 2 },
            }}
          />
        </VictoryChart>
        <Button title="Atualizar" onPress={atualizar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

