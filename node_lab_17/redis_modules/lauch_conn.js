import connection from './redis_conn.js';

async function launch() {
    await connection.connect({ host, port, password });
}

launch();