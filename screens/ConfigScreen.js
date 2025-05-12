import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let storage;
if (Platform.OS === 'web') {
  // fallback para web usando localStorage
  storage = {
    getItem: async (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: async (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  };
} else {
  // AsyncStorage nativo para Android/iOS
  storage = require('@react-native-async-storage/async-storage').default;
}

export default function ConfigScreen() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const loadUrl = async () => {
      const storedUrl = await storage.getItem('apiUrl');
      if (storedUrl) setUrl(storedUrl);
    };
    loadUrl();
  }, []);

  const salvarURL = async () => {
    try {
      await storage.setItem('apiUrl', url);
      Alert.alert('Sucesso', 'URL salva com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao salvar a URL.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="URL da API"
      />
      <Button title="Salvar" onPress={salvarURL} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
