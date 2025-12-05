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
4. Comando para criação de banco e tabelas
```bash
npm run reset-database
```
---
5. Comando para realizar conversões de dado
### Para exportar no formato CSV:
```bash
npm run export-csv 
```
### Para exportar no formato Json:
```bash
npm run export-json 
```
