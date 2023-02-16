import connection from './redis_conn.js';

async function storeValue() {
    await connection.Client.set('key', 'value');
}

storeValue();