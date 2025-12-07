import fs from 'fs'; //Biblioteca utilizada para manipulação de diretórios.
import path from 'path'; //Biblioteca utilizada para obter o caminho.
import { pool } from '../database/db.js'; //Pool de conexão com o banco de dados.

//Tabelas presentes no banco de dados.
const tables = ["mensagens_clientes", "sensores_iot", "comprovantes"];

//Função para exportar dados para arquivos json.
export async function exportJson() {

    //Define o nome e caminho para o diretório de exportações.
    const exportDir = path.resolve("./exports");

    //Cria o diretório e verifica se já existe um com o mesmo nome.
    fs.mkdirSync(exportDir, { recursive: true });

    //Cria um arquivo json para cada tabela.
    for (const table of tables) {

        //Notifica o processo de exportação.
        console.log(`Exportando tabela ${table}...`);

        //Define a variável result
        let result = await pool.query(`SELECT * FROM ${table}`);
    
        //Converte cada linha do resultado obtido da seleção para o formato json.
        const dataJson = JSON.stringify(result.rows, null, 2);

        //Define o nome do arquivo e o diretório que será armazenado.
        const outPutPath = path.join(exportDir, `${table}.json`);

        //Salva o arquivo json.
        fs.writeFileSync(outPutPath, dataJson);

        //Notifica criação do json.
        console.log(`Json gerado em: ${outPutPath}`);
    }

    //Finaliza conexão com o banco de dados.
    await pool.end();

    //Notifica término das exportações.
    console.log("Exportações concluídas.");
}

// Execução direta (Não utilizando o npm run export-json)
if (process.argv[1].includes("export-json.js")) {
    exportJson();
}
