# 📱 Digital Twin — Frontend (Entrega 4)

Aplicativo mobile desenvolvido em React Native para visualização e envio de leituras de sensores em integração com o backend.

---

## ✨ Funcionalidades

- 🔐 Login com autenticação via JWT

- 💾 Armazenamento seguro do token com AsyncStorage

- 🔗 Requisições autenticadas com envio automático do token

- ⚙️ Tela de Configurações para definir dinamicamente a URL da API

- 📊 Lista e detalhe de sensores com gráfico e envio de leitura

- 🔄 Integração completa com o backend (Spring Boot)

---

## 📱 Tecnologias

- React Native (Expo)
- TypeScript
- Axios
- Victory Native (gráficos)
- AsyncStorage

---

## 🚀 Como Executar

1. Instale as dependências:

'''bash
npm install
```
2. Inicie o projeto:

```bash
npx expo start
```
3. Configure a URL da API na tela de "Configurações", por exemplo:

http://192.168.0.24:8080/api


## 🔑 Credenciais para Teste

Use as credenciais:

Usuário: admin
Senha: 1234

## 🧠 Autenticação

O token JWT é armazenado no AsyncStorage e enviado automaticamente nas requisições autenticadas.

## 📂 Estrutura de Pastas
      📦src
      ┣ 📂screens         # Telas do app (Login, Sensores, Detalhe, Configurações)
      ┣ 📂services        # API com Axios + JWT
      ┣ 📂navigation      # Navegação com React Navigation
      ┣ 📂assets          # Imagens e recursos
      ┗ App.tsx

## 📸 Fluxo do App

Tela de Login → Lista de Sensores → Detalhe com gráfico → Enviar leitura → Configurar URL da API.


## 👥 Integrantes do grupo



---

## 📝 Observações

- O token JWT é enviado automaticamente via header Authorization: Bearer <token>.
- A URL da API pode ser alterada a qualquer momento na tela de configurações.
- O gráfico de leitura usa o VictoryChart com dados em tempo real.

