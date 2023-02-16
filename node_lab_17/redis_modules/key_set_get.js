const redis = require('redis');

const key_set_get = async () => {
    const client = redis.createClient();
    console.log(client.isOpen);
    await client.connect();
    await client.set('hello', 'world!');

    const key1Val = await client.get('hello');

    console.log(key1Val);
};

key_set_get();