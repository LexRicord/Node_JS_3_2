const redis = require('redis');
const redisClient = require("./redis_modules/redisClient.js");

const client = redis.createClient({
    socket: {
        host: 'redis-10345.c56.east-us.azure.cloud.redislabs.com',
        port: '10345'
    },
    password: 'Z9JqceVLoRfYzD7LtRAXsxQHCs8h2uYw'
});

let config = {
    "host": "localhost",
    "port": 6379,
    "no_ready_check": true
}
client
    .connect()
    .then(async (res) => {
    })
    .catch((err) => {
        console.log('An error occurred' + err);
    });

async function disconnect() {
    const client = redis.createClient();

    console.log(client.isOpen); // this is false
    if(client.isOpen) {
        console.log("Connection is open. Start disconnection");
        await client.disconnect();
        console.log("Disconnection succesful!");
    }
    else {
        console.log("Connection is not open");
    }
}
disconnect();

client.on('error', err => {
    console.log('An error occurred: ' + err);
});

client.quit();


client.on('connect',()=>
{
    console.log('Connection accepted ');
});

client.on('disconnect',() =>
    {
        console.log('[Disconnection] function')
    }
);

client.on('end', () => 
{
    console.log('End connection.');
});



