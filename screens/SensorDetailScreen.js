import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Dimensions, ActivityIndicator, Alert, TextInput } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';
import { fetchSensorHistorico, postReading } from '../utils/api';

export default function SensorDetailScreen({ route }) {
  const { sensor } = route.params;
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoValor, setNovoValor] = useState('');

  // Buscar histórico do backend
  const atualizar = async () => {
    setLoading(true);
    try {
      const data = await fetchSensorHistorico(sensor.sensorId);
      const pontos = data
        .filter(r => r.sensorValue !== undefined && !isNaN(r.sensorValue))
        .map(r => ({
          x: new Date(r.timestamp),
          y: Number(r.sensorValue),
          label: `Valor: ${r.sensorValue}\n${new Date(r.timestamp).toLocaleTimeString()}`
        }));
      setHistorico(pontos);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar o histórico do sensor');
    } finally {
      setLoading(false);
    }
  };

  // Registrar nova leitura via input
  const registrarLeitura = async () => {
    if (!novoValor || isNaN(novoValor)) {
      Alert.alert('Erro', 'Digite um valor numérico válido');
      return;
    }
    try {
      await postReading(sensor.sensorId, Number(novoValor));
      setNovoValor(''); // limpa input
      await atualizar(); // atualiza gráfico
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível registrar a leitura');
    }
  };

  useEffect(() => {
    atualizar();
    const interval = setInterval(atualizar, 5000); // atualização automática
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{sensor.sensorId}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : historico.length === 0 ? (
          <Text>Nenhuma leitura disponível.</Text>
        ) : (
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 20}
            height={250}
            scale={{ x: "time", y: "linear" }}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => datum.label}
                labelComponent={<VictoryTooltip cornerRadius={4} flyoutStyle={{ fill: 'white' }} />}
              />
            }
          >
            <VictoryAxis
              fixLabelOverlap
              tickFormat={(t) => `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`}
              label="Hora da Leitura"
              style={{ axisLabel: { padding: 30, fontWeight: 'bold' } }}
            />
            <VictoryAxis
              dependentAxis
              label="Valor"
              style={{ axisLabel: { padding: 40, fontWeight: 'bold' } }}
            />
            <VictoryLine
              data={historico}
              style={{ data: { stroke: '#007AFF', strokeWidth: 2 } }}
              interpolation="monotoneX"
            />
          </VictoryChart>
        )}

        {/* Input para nova leitura */}
        <TextInput
          placeholder="Digite o valor do sensor"
          value={novoValor}
          onChangeText={setNovoValor}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={{ height: 10 }} />
        <Button title="Registrar Leitura" onPress={registrarLeitura} />

        <View style={{ marginTop: 20, width: '100%' }}>
          <Button title="Atualizar" onPress={atualizar} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingVertical: 20 },
  container: { paddingHorizontal: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '80%',
    marginTop: 20
  },
});
