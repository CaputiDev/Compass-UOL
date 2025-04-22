# 🏦 API Agregadora de Contas Bancárias (Mini Banco Central)

# Introdução
Esta API REST permite a criação ,visualização e interação de usuários, instituições financeiras, contas bancárias e transações.
---

## 🚀 Tecnologias

### Tecnologias que exigem instalação.

- [Docker](https://www.docker.com/get-started/): Para criar e gerenciar os containers.

- [Node e npm](https://nodejs.org/pt): Ambiente de execução e gerenciador de pacotes para o projeto.

### Tecnologias inclusas no projeto via docker e npm install:


- Express: Framework para Node.js.
- Sequelize ORM: para interagir com o banco de dados.
- PostgreSQL: Banco de dados relacional.

---

# Etapas

## ⬇️ Baixe os arquivos

Apenas esse projeto:

Clique [**AQUI**](https://encurtador.com.br/AXVhl) para baixar apenas este projeto do repostitório

Extraia os arquivos

OU use o git clone:
```bash
cd [...]
git clone https://github.com/CaputiDev/Compass-UOL
```

## 🛠️ Como executar o projeto

### 1. Abra o diretório da pasta do projeto com sua IDE ou no terminal:

```bash
cd ../Compass-UOL\atividades_nodejs\API_Agregadora_de_Contas_Bancárias_(Mini_Banco_Central)>
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o Docker em sua máquina e utilize o comando:

```bash
npm run dev
```
A API estará disponível em:  
📍 `http://localhost:3050/`

Para mais detalhes sobre o banco de dados, clique [**AQUI**](#Banco-de-Dados)

# 📌 Requisições

## 🧑‍💻 **Passo a Passo para Testar as Requisições da API**

### **Importando as Requisições no Insomnia ou Postman**

- **Insomnia** (*recomendado*): Se você estiver usando o Insomnia, já deixei o ambiente pronto para você testar as rotas. Para isso:
  1. Abra o Insomnia.
  2. Importe o arquivo da pasta **Insomnia** para o collections de algum projeto no Insomnia (arquivo com extensão `.har`).
  3. Após importar, você terá todas as rotas já configuradas, pronto para testar a API.
  
- **Postman** (*não recomendado*): Se você preferir usar o Postman :
  1. Abra o Postman.
  2. Vá para **Workspace > Import** no canto superior esquerdo.
  3. Selecione o arquivo com as requisições da pasta **Insomnia**.
  4. O Postman irá importar as rotas e você poderá testar a API.
  
  **OBS**: *Se utlizar o Postman provavelmente terá que fazer ajustes na requisição quando precisar enviar dados no Body ou no Params.*

- **Outras Ferramentas**: Se você estiver utilizando alguma outra ferramenta para testar a API que aceite arquivos `.har`, basta importar o arquivo da mesma maneira.

---

###  **Consultando as Rotas da API**

Se você deseja entender melhor o funcionamento das rotas ou não quer usar os arquivos prontos para importação, você pode consultar as rotas da API manualmente. As principais rotas estão descritas abaixo.

---

## 📂 **Rotas da API**

### 🚀 **Rotas Básicas**

- **[GET /](#get-)** - Rota de teste.

---

### 👤 **Rotas de Usuários**

- **[GET /usuarios](#get-usuarios)** - Lista todos os usuários cadastrados.
- **[POST /usuarios](#post-usuarios)** - Cria um novo usuário.
- **[GET /usuarios/:id/saldo](#get-usuariosidsaldo)** - Retorna o saldo total de um usuário.
- **[GET /usuarios/:id/](#get-usuariosid)** - Retorna os dados de um usuário específico.

---

### 🏦 **Rotas de Instituições**

- **[POST /instituicoes](#post-instituicoes)** - Cadastra uma nova instituição.
- **[GET /instituicoes](#get-instituicoes)** - Lista todas as instituições.
- **[GET /instituicoes/:id/](#get-instituicoesid)** - Lista uma instituição pelo ID.

---

### 💳 **Rotas de Contas**

- **[POST /usuarios/contas](#post-usuarioscontas)** - Cria uma nova conta bancária.
- **[GET /usuarios/contas](#get-usuarioscontas)** - Lista todas as contas do sistema.
- **[GET /usuarios/:id/contas](#get-usuariosidcontas)** - Lista as contas de um usuário específico.

---

### 💰 **Rotas de Transações**

- **[POST /usuarios/:id/transacoes](#post-usuariosidtransacoes)** - Realiza uma transação (depósito, saque ou transferência).
- **[GET /usuarios/extrato](#get-usuariosextrato)** - Lista todas as transações.
- **[GET /usuarios/:id/extrato](#get-usuariosidextrato)** - Retorna o extrato de transações de um usuário.

---

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
    "id": "num",
    "cpf": "cpf",
    "nome": "nome",
    "qtd_contas": "num_contas"
  }
  {"..."}
  "..."
]
```

#### `POST /usuarios`  
Cria um novo usuário.

**Corpo da Requisição:**
```json
{
  "cpf": "12345678900",
  "nome": "João Silva"
}
```

**Resposta:**
```json
{
  "id": "num",
  "cpf": "12345678900",
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
  "saldo_total": "$$$.$$"
}
```

#### `GET /usuarios/:id/`  
Retorna os dados de um usuário específico.

**Resposta:**
```json
{
  "id": 'num",
  "cpf": "cpf",
  "nome": "Usuario",
  "qtd_contas": "num_contas"
}
```

---

### 🏦 Rotas de Instituições

#### `POST /instituicoes`  
Cadastra uma nova instituição.

**Corpo da Requisição:**
```json
{
  "nome": "Banco Compass",
  "cnpj": "00000000000100"
}
```

**Resposta:**
```json
{
  "id": "num",
  "nome": "Banco Compass",
  "cnpj": "00000000000100"
}
```

#### `GET /instituicoes`  
Lista todas as instituições.

**Resposta:**

Retorna todas instituições cadastradas.

#### `GET /instituicoes/:id/`  
Lista a instituição pelo ID.

**Resposta:**

```json
[
  {
    "id": "id_inserido",
    "nome": "Instituição Financeira"
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
  "usuario_id": "id",
  "instituicao_id": "id"
}
```

**Resposta:**
```json
{
	"message": "Conta de 'Usuario' criada na instituição 'instituicao'",
	"new_account": {
		"id_conta": "id_conta",
		"usuario_id": "usuario_id",
		"instituicao_id": "instituicao_id",
		"saldo": "$$$.$$",
		"nome_usuario": "Usuario",
		"cpf_usuario": "cpf_usuario",
		"nome_instituicao": "instituicao",
		"updatedAt": "timestamp",
		"createdAt": "timestamp"
	}
}
```

#### `GET /usuarios/contas`  
Lista todas as contas do sistema.

**Resposta:**
```json
[
  {
    "id_conta": "num",
    "usuario_id": "num",
    "instituicao_id": "num",
    "saldo": "$$$.$$"
  }
]
```

#### `GET /usuarios/:id/contas`  
Lista as contas de um usuário.

**Resposta:**
```json
[
  {
    "id_conta": "num",
    "usuario_id": "num",
    "instituicao_id": "num",
    "saldo": "1000.00"
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
	"createdAt": "timestamp",
	"updatedAt": "timestamp",
	"id": id_transferencia,
	"conta_id": "2",
	"tipo": "transferencia",
	"valor": "120.00",
	"descricao": "Pix pra ajudar no churras dos piá",
	"conta_destino_id": "3"
}
```
#### `GET /usuarios/extrato` 
Lista todas as transações.

**Resposta:**

Retorna uma lista contendo todas transações.

#### `GET /usuarios/:id/extrato`  
Retorna o extrato de transações do usuário.

**Parâmetro opcional:**

- `instituicao_id` → filtra por instituição

**URL**

#### `GET /usuarios/1/extrato?instituicao_id=1`

**Resposta:**
```json
[
	{
		"id": 1,
		"tipo": "transferencia",
		"valor": "100.00",
		"descricao": "Pix",
		"data": "timestamp",
		"de": {
			"id": 1,
			"nome": "Luiz Fantin Neto",
			"cpf": "cpf_remetente"
		},
		"para": {
			"id": 2,
			"nome": "Wandreus Muhl Dourado",
			"cpf": "cpf_destinatario"
		}
	},
]
```
---

# Banco de Dados
Quando iniciar a API, o Banco de dados já estará funcionando.

## Se quiser visualizar pelo navegador (opcional):

Acesse 📍 `http://localhost:5050/`  

Efetue o login com os dados:

📧 Email: admin@admin.com

🔑 Senha: admin

---

Adicione uma nova conexão (apenas na primeira vez):
Name: (opcional, Exemplos dahora: mini_banco, bd, postgres )

Host name/address: db

Port: 5432

Username: postgres

Password: postgres

Database: mini_banco_central

Após a primeira vez, o pgAdmin irá lembrar da conexão!

---
## 2. Caso prefira utilizar o sequelize-cli (opcional)

```bash
npx sequelize db:migrate
```


---

## Obrigado por testar meu projeto!

### Finalizando

Se quiser limpar seu ambiente, interrompa o servidor com **CTRL + C** e insira este código no terminal:
````bash
docker compose down -v
````
