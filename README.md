# 🌐 **Digital Twin Backend — Entrega 4**

Backend desenvolvido em **Java + Spring Boot** para o projeto **Digital Twin**, agora com autenticação JWT para acesso seguro aos dados dos sensores.

---

## ✅ **Principais Recursos**

| Funcionalidade | Status |
|----------------|:------:|
| CRUD de leituras de sensores (`/api/readings`) | ✅ |
| Banco H2 (modo arquivo) para persistência | ✅ |
| Autenticação via `/auth` com login (`admin` / `1234`) | ✅ |
| Geração e validação de token **JWT** | ✅ |
| Filtro global para proteger rotas | ✅ |
| CORS habilitado para integração com o frontend | ✅ |

---

## 🚀 **Como Executar o Projeto**

### 🔧 **Requisitos**

- Java **17+**
- Maven
- (Opcional) Docker

### ▶️ **Rodando localmente**


# 1. Clonar o repositório
git clone https://github.com/alba1818/desafio-dt.git

# 2. Acessar a pasta
cd backend-digitaltwin

# 3. Executar com Maven
./mvnw spring-boot:run

# 4. A API ficará disponível em: http://localhost:8080/api

### **🔐 Autenticação**
Endpoint: POST /auth

# 📥 Request Body

json
Copy code
{
  "username": "admin",
  "password": "1234"
}
# 📤 Response

json
Copy code
{
  "token": "JWT_AQUI"
}
### **📊 Endpoints de Leituras de Sensores**
# ✅ Atenção: Enviar o token no header
Authorization: Bearer SEU_TOKEN

# Método	Rota	Descrição
GET	/api/readings	Retorna todas as leituras
POST	/api/readings	Cria uma nova leitura
PUT	/api/readings/{id}	Atualiza uma leitura existente
DELETE	/api/readings/{id}	Remove uma leitura

### **🗄️ Banco de Dados — H2**
# Item	Valor
Arquivo	~/sensor-readings.h2.db
Console H2	http://localhost:8080/h2-console
JDBC URL	jdbc:h2:file:~/sensor-readings
Usuário	sa
Senha	(vazio)

### **👥 Integrantes do Grupo**
**Gabriel de Moraes Alba	RM98212**
**Joao Marco Arantes Pupo	RM97693**
**Guilherme Saraiva Lustosa	RM550423**
**Davi Fernandes Coutinho	RM550727**
**Nilton Miranda	RM97868**