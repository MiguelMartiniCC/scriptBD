// index.js

import { pool } from './database/db.js'; // Importa o pool de conexões do seu arquivo db.js
import fs from 'fs'; 
import path from 'path';

// Note que aqui não precisamos mais do dotenv, pois o db.js já o carrega.

async function runDatabaseSetup() {
    let connection;
    try {
        // Você pode obter uma conexão específica do pool se precisar,
        // mas o pool.query() já faz isso por baixo dos panos.
        
        console.log('Pool de conexões pronto. Tentando executar script SQL...');

        // --- Lendo e Executando o Script SQL ---
        
        // 1. Caminho para o seu arquivo SQL
        const sqlFilePath = path.resolve(process.cwd(), 'database', 'banco.sql');
        
        // 2. Lê o conteúdo do arquivo SQL
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        // 3. Executa o script. O pool gerencia a conexão automaticamente.
        const result = await pool.query(sql);

        console.log('✅ Script SQL executado com sucesso!');
        // console.log('Resultado da query (se houver):', result); 
        
    } catch (err) {
        console.error('❌ ERRO FATAL: Falha ao inicializar o banco de dados.', err.message);
    } finally {
        // Se a sua aplicação não é um servidor web, é bom fechar o pool
        // após a inicialização do banco, se for o último uso.
        // Se for um servidor web, MANTENHA O POOL ABERTO.
        await pool.end(); 
    }
}

// Chama a função principal para iniciar o processo
runDatabaseSetup();