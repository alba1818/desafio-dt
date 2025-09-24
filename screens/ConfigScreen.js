import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { setApiBaseUrl, getApiBaseUrl } from '../utils/api';

export default function ConfigScreen() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(getApiBaseUrl());
  }, []);

  const salvarURL = () => {
    setApiBaseUrl(url);
    Alert.alert('Sucesso', 'URL da API atualizada!');
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
