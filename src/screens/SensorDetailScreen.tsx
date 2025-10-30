import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Button, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import { getApi } from '../services/api';

// Tipagem para a rota recebida
type SensorDetailRouteProp = RouteProp<RootStackParamList, 'Detalhe'>;

// Tipo para uma leitura
type Reading = {
  id?: number;
  sensorId: string;
  readingValue: number;
  timestamp: string;
};

export default function SensorDetailScreen() {
  const route = useRoute<SensorDetailRouteProp>();
  const { sensor } = route.params;

  const [readings, setReadings] = useState<Reading[]>([]);
  const [novoValor, setNovoValor] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  // Busca as leituras ao carregar
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const api = await getApi();
        const response = await api.get<Reading[]>('/readings');
        const sensorReadings = response.data.filter(r => r.sensorId === sensor.id);
        setReadings(sensorReadings);
      } catch (error: any) {
        console.error('❌ Erro ao buscar leituras:', error?.response?.data || error.message || error);
        Alert.alert('Erro', 'Não foi possível carregar as leituras.');
      }
    };

    fetchReadings();
  }, []);

  // Prepara dados para o gráfico
  const chartData = readings.map(reading => ({
    x: new Date(reading.timestamp),
    y: parseFloat(reading.readingValue.toFixed(2))
  }));

  const chartWidth = Dimensions.get('window').width - 32;

  const ultimoValor = readings.length > 0
    ? readings[readings.length - 1].readingValue.toFixed(2)
    : '--';

  // Envia uma nova leitura para o backend
  const enviarLeitura = async () => {
    const valor = parseFloat(novoValor);
    if (isNaN(valor)) {
      Alert.alert('Erro', 'Digite um valor numérico válido.');
      return;
    }

    const novaLeitura: Reading = {
      sensorId: sensor.id,
      readingValue: valor,
      timestamp: new Date().toISOString()
    };

    try {
      setEnviando(true);
      const api = await getApi();
      await api.post('/readings', novaLeitura);
      setNovoValor('');
      Alert.alert('Sucesso', 'Leitura enviada com sucesso!');
      setReadings(prev => [...prev, novaLeitura]);
    } catch (error: any) {
      console.error('❌ Erro ao enviar leitura:', error?.response?.data || error.message || error);
      Alert.alert('Erro', 'Não foi possível enviar a leitura.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{sensor.nome}</Text>
      <Text style={styles.valorAtual}>Último valor: {ultimoValor}</Text>

      <Text style={styles.subtitulo}>Cadastrar nova leitura</Text>
      <TextInput
        placeholder="Digite o valor"
        value={novoValor}
        onChangeText={setNovoValor}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title={enviando ? 'Enviando...' : 'Enviar Leitura'}
        onPress={enviarLeitura}
        disabled={enviando}
      />

      <Text style={styles.subtitulo}>Histórico de Leituras</Text>

      <VictoryChart
        width={chartWidth}
        height={250}
        theme={VictoryTheme.material}
        domainPadding={{ y: 10 }}
        scale={{ x: 'time' }}
      >
        <VictoryAxis
          fixLabelOverlap
          tickFormat={(t: unknown) => {
            const date = new Date(t as string);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }}
          style={{ tickLabels: { angle: -30, fontSize: 10 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick.toFixed(2)}
        />
        <VictoryLine
          interpolation="monotoneX"
          data={chartData}
          style={{
            data: { stroke: '#007AFF', strokeWidth: 2 }
          }}
        />
      </VictoryChart>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  valorAtual: {
    fontSize: 18,
    marginBottom: 16
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginBottom: 12
  }
});
