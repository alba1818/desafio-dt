import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [url, setUrl] = useState('');
  const [salvando, setSalvando] = useState(false);

  const STORAGE_KEY = '@url_api'; // 🔐 compatível com o api.ts

  // Carrega a URL salva ao abrir a tela
  useEffect(() => {
    const loadUrl = async () => {
      try {
        const savedUrl = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUrl) {
          setUrl(savedUrl);
        }
      } catch (error) {
        console.error('Erro ao carregar a URL:', error);
      }
    };

    loadUrl();
  }, []);

  // Salva a URL no AsyncStorage
  const salvarUrl = async () => {
    if (!url || !url.startsWith('http')) {
      Alert.alert('Erro', 'Informe uma URL válida (ex: http://192.168.0.24:8080/api)');
      return;
    }

    try {
      setSalvando(true);
      await AsyncStorage.setItem(STORAGE_KEY, url);
      Alert.alert('Sucesso', `URL "${url}" salva com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar a URL:', error);
      Alert.alert('Erro', 'Não foi possível salvar a URL.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações da API</Text>

      <Text style={styles.label}>URL atual:</Text>
      <TextInput
        style={styles.input}
        placeholder="http://192.168.x.x:8080/api"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      <Button
        title={salvando ? 'Salvando...' : 'Salvar'}
        onPress={salvarUrl}
        disabled={salvando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
});
