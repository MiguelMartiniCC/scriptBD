## Rodando Localmente
### Pré-requisitos
- [Node.Js Download](https://www.nodejs.tech/pt-br/download)

---
1. Clone o repositório
```bash
git clone https://github.com/viitotito/scriptBD
```
---
2. Entre na pasta
```bash
cd scriptBD
```
---
3. Utilize o comando para baixar os pacotes do composer.json:
```bash
npm i
```
---
4. Copie o arquivo `.env.template` para `.env`, e ajuste as variáveis de acordo com o seu banco de dados:
```bash
copy .env.example .env
```
---
5. Comando para criação de banco e tabelas
```bash
npm run reset-database
```
---
6. Comando para realizar conversões de dado
```bash
npm run export-json 
```
---
## Utilizando MongoDB Atlas
- Para utilizar o serviço em nuvem do MongoDB e conectar com o script, segue os seguintes passos:
---
1. Criar um cluster no Atlas
2. Criar um usuário do banco (guarde os dados como nome e senha)
3. Libere o IP em: Network Access > IP Whitelist > Add IP Address > Allow access from anywhere
4. Pegar a conexão de string em: Database > Connect > Drivers e copie
5. No arquivo import-json.js cole a string substituindo o name e password pelas que foram copiadas em outras etapas: 
``` const client = new MongoClient("sua string de conexão") ```
