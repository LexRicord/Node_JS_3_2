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
    console.log();

    await client.pSubscribe('*', (msg, channel) => {
        console.log(`Channel ${channel} sent message: ${msg}`);
    }, true);

    setTimeout(async () => {
        await client.pUnsubscribe();
        client.quit();
    }, 6000);
})()
