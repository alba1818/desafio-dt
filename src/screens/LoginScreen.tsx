import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApi } from '../services/api';

type LoginScreenProps = {
  onLoginSuccess: () => void;
};

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    console.log('▶️ Botão Entrar clicado');

    if (!username || !senha) {
      Alert.alert('Erro', 'Informe usuário e senha.');
      return;
    }

    setCarregando(true);

    try {
      const api = await getApi();
      const credenciais = { username, password: senha };

      console.log('🔁 Enviando dados para /auth:', credenciais);

      const response = await api.post('/auth', credenciais);

      const token: string = response.data.token;
      console.log('✅ Token recebido:', token);

      // Salvar token no AsyncStorage
      await AsyncStorage.setItem('jwtToken', token);

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      onLoginSuccess();
    } catch (error: any) {
      const erroMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Erro ao conectar com o servidor.';
      console.error('❌ Erro no login:', erroMsg);

      Alert.alert('Erro', 'Usuário ou senha inválidos, ou erro de conexão.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={carregando ? 'Entrando...' : 'Entrar'}
        onPress={handleLogin}
        disabled={carregando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
});