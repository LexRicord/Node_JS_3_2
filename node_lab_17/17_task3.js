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

    await client.set('incr', 0);


    console.time('incr("incr") 10000 operations tine');
    for (let i = 1; i <= 10000; ++i) {
        await client.incr('incr');
        if(i == 5000) await client.incr('incr').then(function (result){
            console.log("Test out: ["+result+"]")
        });
    }
    console.timeEnd('incr("incr") 10000 operations tine');


    console.time('incr("decr") 10000 operations tine');
    for (let i = 1; i <= 10000; ++i) {
        await client.incr('decr');
    }
    console.timeEnd('incr("decr") 10000 operations tine');


    await client.quit();
})();