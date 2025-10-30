import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_URL = 'http://localhost:8080/api';

let apiInstance = axios.create({ baseURL: DEFAULT_URL });

export const getApi = async () => {
  try {
    // 🔹 Pega URL configurada na tela de Configurações
    const url = await AsyncStorage.getItem('@url_api');
    const token = await AsyncStorage.getItem('jwtToken'); // 🔹 token salvo no login

    // 🔹 Atualiza baseURL se for diferente
    if (url && url !== apiInstance.defaults.baseURL) {
      apiInstance = axios.create({ baseURL: url });
    }

    // 🔹 Define cabeçalho de autenticação
    apiInstance.defaults.headers.common['Content-Type'] = 'application/json';
    if (token) {
      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiInstance.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Erro ao configurar API:', error);
  }

  return apiInstance;
};