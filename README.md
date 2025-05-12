# Desafio Digital Twin 📱💨

Este projeto é uma aplicação mínima desenvolvida em React Native (com Expo) para simular a exibição de dados de sensores de um sistema Digital Twin com foco em componentes pneumáticos.

## 🚀 Funcionalidades

- **Tela de Splash / Login**
  - Exibe o logo e botão “Começar”.
- **Lista de Componentes Pneumáticos**
  - Mostra sensores (nome, valor atual e status).
- **Detalhe do Sensor**
  - Histórico de dados (gráfico interativo).
  - Botão "Atualizar" para simular re-fetch da API.
- **Tela de Configuração**
  - Permite definir a URL da API (usando armazenamento local).

## 🧪 Tecnologias Utilizadas

- [Expo CLI]
- [React Navigation]
- [Axios]
- [Victory ]
- [AsyncStorage]

## 📂 Estrutura de Pastas

```
desafio-dt/
├── assets/
│   └── logo.png
├── mock/
│   └── sensors.json
├── screens/
│   ├── HomeScreen.js
│   ├── SensorDetailScreen.js
│   ├── ConfigScreen.js
│   └── SplashScreen.js
├── utils/
│   └── api.js
├── App.js
└── README.md
```

## ▶️ Como Rodar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/alba1818/desafio-dt.git
cd desafio-dt
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o projeto:**

```bash
npx expo start --web
```


> **⚠️ Requisitos:** Node.js, Git, Expo CLI instalado globalmente (`npm install -g expo-cli`).

## 🧪 Teste com dados mock

- Os dados estão em: `mock/sensors.json`
- Você pode configurar a URL local para o mock acessando a aba de **Configuração** no app:
  
```
http://localhost:8081/mock/sensors.json
```

> (ou simplesmente utilize `require('../mock/sensors.json')` caso prefira importar direto no código)

## 👤 Integrantes

- **Gabriel Alba**
- **RM:** [98212]
- **Guilherme Saraiva Lustosa**
- **RM:** [550423]
- **Davi Fernandes Coutinho**
- **RM:** [550727]
- **João Marcos Arantes**
- **RM:** [97693]


---

