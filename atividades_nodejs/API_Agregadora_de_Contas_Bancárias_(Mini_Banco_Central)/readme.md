## 💳 API Agregadora de Contas Bancárias (Mini_Banco_Central)

Esta API REST permite o gerenciamento de usuários, instituições financeiras, contas bancárias e transações, utilizando Node.js, Express, Sequelize, PostgreSQL e Docker.

---

## 🚀 Tecnologias

- Node
- Express
- Sequelize
- PostgreSQL
- Docker

---

## 🛠️ Como executar o projeto


### 2. Instale as dependências

```bash
npm install
```

### 3. Suba os containers com Docker (já está tudo pronto com o script "dev")

```bash
npm run dev
```

## BD

### 1. Quando rodar o npm run dev

O Server pgAdmin estará rodando em:  
📍 `http://localhost:5050/`

---
## Efetue o login

📧 Email: admin@admin.com

🔑 Senha: admin

---

Adicione uma nova conexão (apenas na primeira vez):
Name: Mini Banco Central (opcional, nomeia à sua escolha)

Host name/address: db

Port: 5432

Username: postgres

Password: postgres

Database: mini_banco_central

Após a primeira vez, o pgAdmin irá lembrar da conexão!

---
#### 2. Caso prefira utilizar o sequelize-cli

```bash
npx sequelize db:migrate
```

## API

A API estará disponível em:  
📍 `http://localhost:3050/`

---

## 📌 Rotas da API

### 📂 Rota Básica

`GET /`  
🔹 Descrição: Rota de teste.  
🔸 Resposta:
```json
{ "message": "olá mundo" }
```

---

### 👤 Rotas de Usuários

#### `GET /usuarios`  
Lista todos os usuários cadastrados.

**Resposta:**
```json
[
  {
    "id": 1,
    "cpf": "123.456.789-00",
    "nome": "João Silva",
    "qtd_contas": 2
  }
]
```

#### `POST /usuarios`  
Cria um novo usuário.

**Corpo da Requisição:**
```json
{
  "cpf": "123.456.789-00",
  "nome": "João Silva"
}
```

**Resposta:**
```json
{
  "id": 1,
  "cpf": "123.456.789-00",
  "nome": "João Silva"
}
```

#### `GET /usuarios/:id/saldo`  
Retorna o saldo total do usuário.

**Parâmetro opcional:**
- `instituicao` → filtra por uma instituição específica

**Resposta:**
```json
{
  "saldo_total": "1500.00"
}
```

#### `GET /usuarios/:id/`  
Retorna os dados de um usuário específico.

**Resposta:**
```json
{
  "id": 1,
  "cpf": "123.456.789-00",
  "nome": "João Silva",
  "qtd_contas": 2
}
```

---

### 🏦 Rotas de Instituições

#### `POST /instituicoes`  
Cadastra uma nova instituição.

**Corpo da Requisição:**
```json
{
  "nome": "Banco XYZ",
  "cnpj": "00.000.000/0001-00"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Banco XYZ",
  "cnpj": "00.000.000/0001-00"
}
```

#### `GET /instituicoes`  
Lista todas as instituições.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Banco XYZ"
  }
]
```

---

### 💳 Rotas de Contas

#### `POST /usuarios/contas`  
Cria uma nova conta bancária.

**Corpo da Requisição:**
```json
{
  "usuario_id": 1,
  "instituicao_id": 1
}
```

**Resposta:**
```json
{
  "message": "Conta de 'João Silva' criada na instituição 'Banco XYZ'",
  "new_account": {
    "id_conta": 1,
    "usuario_id": 1,
    "instituicao_id": 1,
    "saldo": 0.0
  }
}
```

#### `GET /usuarios/contas`  
Lista todas as contas do sistema.

**Resposta:**
```json
[
  {
    "id_conta": 1,
    "usuario_id": 1,
    "instituicao_id": 1,
    "saldo": 1000.00
  }
]
```

#### `GET /usuarios/:id/contas`  
Lista as contas de um usuário.

**Resposta:**
```json
[
  {
    "id_conta": 1,
    "usuario_id": 1,
    "instituicao_id": 1,
    "saldo": 1000.00
  }
]
```

---

### 💰 Rotas de Transações

#### `POST /usuarios/:id/transacoes`  (o */:id* simula uma autenticação que deve concordar com o *conta_id* )

Realiza uma transação (depósito, saque ou transferência).

**Corpo da Requisição:**
```json
{
	"conta_id" : "2",
 	"tipo": "transferencia",
 	"valor": "120",
 	"descricao" : "Pix pra ajudar no churras dos piá",
 	"conta_destino_id" : "3"
}

```

**Resposta:**
```json
{
	"id": 4, 
	"conta_id": 2,
	"tipo": "transferencia",
	"valor": "120.00",
	"descricao": "Pix",
	"conta_destino_id": 3
}
```
#### `GET /usuarios/extrato` 
Lista todas as transações.

**Resposta:**
```json
[
	{
		"id": 1,
		"tipo": "transferencia",
		"valor": "120.00",
		"descricao": "pra tu comprar um Xis",
		"data": "2025-04-17T15:06:58.673Z",
		"de": {
			"id": 2,
			"nome": "Wandreus Muhl Dourado",
			"cpf": "71886133077"
		},
		"para": {
			"id": 3,
			"nome": "Gabriel Missio da Silva",
			"cpf": "47962443040"
		}
	},
	{
		"id": 4,
		"tipo": "transferencia",
		"valor": "1000.00",
		"descricao": "Pix",
		"data": "2025-04-17T15:08:31.018Z",
		"de": {
			"id": 3,
			"nome": "Gabriel Missio da Silva",
			"cpf": "47962443040"
		},
		"para": {
			"id": 1,
			"nome": "Luiz Fantin Neto",
			"cpf": "00616459857"
		}
	},
  {...}
]
````
#### `GET /usuarios/:id/extrato`  
Retorna o extrato de transações do usuário.

**Parâmetro opcional:**
- `instituicao_id` → filtra por instituição

**Resposta:**
```json
[
 {
		"id": 5,
		"tipo": "deposito",
		"valor": "12000.00",
		"descricao": "Salário",
		"data": "2025-04-17T15:12:36.814Z",
		"de": {
			"id": 3,
			"nome": "Gabriel Missio da Silva",
			"cpf": "47962443040"
		},
		"para": null
	}
]
```
---