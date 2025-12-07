import {mongoclient} from '../database/mongo.js';
import fs from "fs";
import { prompt } from "../utils/prompt.js";

async function importarDados() {
  try {
    // Lê o arquivo JSON
    const dbTable = await prompt('Digite o nome da tabela que deseja importar: ');
    const data = JSON.parse(fs.readFileSync(`exports/${dbTable}.json`, "utf8"));

    const db = mongoclient.db("clientes");

    const dbCollection = await prompt('Digite o nome da Collection que deseja criar no mongo DB: ')
    const colecao = db.collection(`${dbCollection}`);

    const resultado = await colecao.insertMany(data);

    console.log("Importação concluída!");
    console.log("Total inserido:", resultado.insertedCount);

    await mongoclient.close();
  } catch (erro) {
    console.error("Erro ao importar:", erro);
    console.log("============================");
    console.log("Verifique se o arquivo foi exportado em json ou CTRL + C para sair");
    importarDados();
  }
}

if (process.argv[1].includes("import-json.js")) {
    importarDados();
}