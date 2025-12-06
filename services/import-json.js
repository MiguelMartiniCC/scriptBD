import { MongoClient } from "mongodb";
import fs from "fs";

async function importarDados() {
  try {
    // Lê o arquivo JSON
    const data = JSON.parse(fs.readFileSync("exports/clientes.json", "utf8"));
    // console.log(data)
    const client = new MongoClient("") //Aqui deve ser inserido a string de conexão com o atlas do mongoDB
    await client.connect();

    // console.log("Conexão feita!");

    const db = client.db("clientes");
    const colecao = db.collection("users");

    const resultado = await colecao.insertMany(data);

    console.log("Importação concluída!");
    console.log("Total inserido:", resultado.insertedCount);

    await client.close();
  } catch (erro) {
    console.error("Erro ao importar:", erro);
  }
}

importarDados();
