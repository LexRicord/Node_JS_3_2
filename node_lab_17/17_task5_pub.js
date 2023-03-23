const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('ready', function () {
    console.log('debug', 'redisClient is ready');
});

client.on('connect', function () {
    console.log('debug', 'redisClient is connected');
});

client.on('end', function () {
    console.log('debug', 'redisClient is end');
});

client.on('error', function (error) {
    console.log('error', 'Error in redisClient', {error:error});
});

(async () => {
    await client.connect();

    setInterval(async () => {
        await client.publish('Publication1', 'Hello World! #1');
    }, 2200)
        .unref();

    setInterval(async () => {
        await client.publish('Publication2', 'Hello World! #2');
    }, 3000)
        .unref();

    setTimeout(async () => {
        await client.quit();
    }, 9000);
})();

