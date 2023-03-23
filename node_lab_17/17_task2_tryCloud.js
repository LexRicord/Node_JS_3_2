let redis = require('redis');

const localClient = redis.createClient({
    host: process.env.REDIS_REMOTE_HOST,
    port: process.env.REDIS_REMOTE_PORT,
    password: process.env.REDIS_PASSWORD,
    auth_pass: process.env.AUTH_PASS2,
    logErrors: true,
});

localClient.on('ready', function () {
    console.log('debug', 'redisClient is ready');
});

localClient.on('connect', function () {
    console.log('debug', 'redisClient is connected');
});

localClient.on('end', function () {
    console.log('debug', 'redisClient is end');
});

localClient.on('error', function (error) {
    console.log('error', 'Error in redisClient', {error:error});
});

(async () => {
    await localClient.connect();

    console.time('SET 10000 operations time');
    for (let i = 1; i <= 10000; ++i) {
        await localClient.set(i.toString(), 'set' + i);
    }
    console.timeEnd('SET 10000 operations time');

    console.time('GET 10000 operations time');
    for (let i = 1; i <= 10000; ++i) {
        await localClient.get(i.toString());
    }
    console.timeEnd('GET 10000 operations time');


    console.time('DEL 10000 operations time');
    for (let i = 1; i <= 10000; ++i) {
        await localClient.del(i.toString());
    }
    console.timeEnd('DEL 10000 operations time');

    await localClient.quit();
})();