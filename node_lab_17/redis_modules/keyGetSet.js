const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_REMOTE_HOST,
    port: process.env.REDIS_REMOTE_PORT,
    //password: process.env.REDIS_PASSWORD2,
    auth_pass: process.env.AUTH_PASS2,
    logErrors: true,
});

module.exports.keyGetSet_test = async function keyGetSet(){
    await (async () => {
        client.on("error", (error) => console.error(`Error : ${error}`));

        await client.connect();
    })();
    await client.set('hello', 'world!');
    let key1Val = await client.get('hello');
    return key1Val;
}