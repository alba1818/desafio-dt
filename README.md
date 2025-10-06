

Integrantes

Gabriel de Moraes Alba - RM 98212

Guilherme Saraiva Lustosa - RM 550423

Davi Fernandes Coutinho - RM 550727

Joao Marcos Arantes Pupo - RM 97693

Nilton Miranda - RM: [97868]

🛰️ Projeto – Integração Frontend + Backend (Sprint 3)
🎯 Objetivo

Esta sprint tem como objetivo integrar o aplicativo mobile em React Native com o backend em Spring Boot, substituindo os mocks por dados reais e implementando a visualização dinâmica de leituras de sensores em tempo real.

⚙️ Estrutura do Projeto

O projeto é dividido em duas partes:

Camada	Tecnologia	Descrição
Backend	Spring Boot (Java + H2)	API REST responsável pelo armazenamento e fornecimento das leituras dos sensores.
Frontend	React Native (Expo)	Aplicativo mobile para visualização e registro de novas leituras.
🚀 Instruções para Execução
🧩 1. Clonar o repositório
git clone https://github.com/seuusuario/nome-do-repositorio.git
cd nome-do-repositorio

🖥️ 2. Executar o Backend (Spring Boot)
✅ Pré-requisitos:

Java 17+

Maven

🔧 Passos:

Abra a pasta backend/ no terminal.

Execute o comando:

mvn spring-boot:run


O backend iniciará em:

http://localhost:8080


Acesse o console do H2 para verificar o banco de dados (opcional):

http://localhost:8080/h2-console


Configurações H2 padrão:

JDBC URL: jdbc:h2:file:./data/sensors-db

Usuário: sa

Senha: (vazia)

📱 3. Executar o Frontend (React Native)
✅ Pré-requisitos:

Node.js 18+

Expo CLI (npm install -g expo-cli)

🔧 Passos:

Abra a pasta frontend/ no terminal.

Instale as dependências:

npm install


Inicie o app:

npx expo start


Pressione W para abrir no navegador ou A/I para abrir em emulador Android/iOS.

🌐 4. Configurar o Endereço da API no App

No app, vá até a Tela de Configurações e insira a URL do backend (caso esteja rodando localmente):

http://localhost:8080/api/readings


💡 Se estiver testando pelo celular físico, substitua localhost pelo IP local do seu PC (exemplo: http://192.168.0.10:8080/api/readings).

🧠 Endpoints da API
🔹 GET /api/readings

Retorna todas as leituras registradas.

Exemplo de resposta:

[
  {
    "id": 1,
    "sensorId": "sensor-Termo",
    "sensorValue": 22.7,
    "timestamp": "2025-09-23T19:48:34"
  },
  {
    "id": 2,
    "sensorId": "sensor-Umid",
    "sensorValue": 45.1,
    "timestamp": "2025-09-23T19:50:12"
  }
]

🔹 POST /api/readings

Cria uma nova leitura no sistema.

Exemplo de requisição:

{
  "sensorId": "sensor-Termo",
  "sensorValue": 29.3,
  "timestamp": "2025-09-30T14:30:00"
}


Resposta esperada:

{
  "id": 3,
  "sensorId": "sensor-Termo",
  "sensorValue": 29.3,
  "timestamp": "2025-09-30T14:30:00"
}

📊 Funcionalidades Implementadas
Tela	Descrição
Lista de Sensores	Mostra todos os sensores e suas últimas leituras vindas do backend.
Tela de Detalhes	Exibe o histórico de leituras em um gráfico dinâmico (VictoryChart).
Registrar Leitura	Permite inserir uma nova leitura mock via POST.
Tela de Configurações	Usuário pode alterar a URL da API diretamente no app.
Indicador de Carregamento	Mostrado durante as requisições.

📷 Prints do App (exemplos)


<img width="1915" height="916" alt="image" src="https://github.com/user-attachments/assets/1e34dcdd-7a12-4fbb-8bb4-bfe721300855" />


<img width="1905" height="574" alt="image" src="https://github.com/user-attachments/assets/ebc7a7b4-850b-4f77-82cd-3cf6c1fb5b96" />





🧩 Tecnologias Utilizadas

Backend

Java 17

Spring Boot

Spring Data JPA

Banco de dados H2

Maven

Frontend

React Native (Expo)

Axios

Victory Native (para gráficos)

React Navigation



✅ Status da Entrega

 Backend com persistência em H2

 API com CORS habilitado

 Frontend consumindo API real

 Gráfico dinâmico com histórico

 Registro de novas leituras

 README completo com prints e exemplos
