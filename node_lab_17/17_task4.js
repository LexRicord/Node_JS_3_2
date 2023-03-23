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

    await client.set('hash', 0);


    console.time('HSET 10000 operations time');
    for (let i = 1; i <= 10000; ++i) {
        await client.hSet('MyHash', i.toString(), JSON.stringify({ id: i, value: 'value #' + i }));
    }
    console.timeEnd('HSET 10000 operations time');


    console.time('HGET 10000 operations time');
    for (let i = 1; i <= 10000; ++i) {
        await client.hGet('MyHash', i.toString());
        if (i == 9999) await client.hGet('MyHash',i.toString()).then(function (result){
            console.log("Test out: ["+result+"]")
        });
    }
    console.timeEnd('HGET 10000 operations time');

    await client.quit();
})();