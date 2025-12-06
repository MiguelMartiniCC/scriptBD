import {mongoclient} from '../database/mongo.js';
import fs from "fs";

async function importarDados() {
  try {
    // Lê o arquivo JSON
    const data = JSON.parse(fs.readFileSync("exports/clientes.json", "utf8"));
    // console.log(data)
    await mongoclient.connect()
    // console.log("Conexão feita!");

    const db = mongoclient.db("clientes");
    const colecao = db.collection("users");

    const resultado = await colecao.insertMany(data);

    console.log("Importação concluída!");
    console.log("Total inserido:", resultado.insertedCount);

    await mongoclient.close();
  } catch (erro) {
    console.error("Erro ao importar:", erro);
  }
}

if (process.argv[1].includes("import-json.js")) {
    importarDados();
}

