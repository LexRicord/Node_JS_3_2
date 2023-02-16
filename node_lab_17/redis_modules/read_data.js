const connection = require('./redis_conn.js');

async function readValue() {
    const key = await connection.Client.get('key');
    console.log(key);
}

readValue();