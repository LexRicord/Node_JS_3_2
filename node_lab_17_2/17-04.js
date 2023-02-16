const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);
const count = 10000;



let t = setInterval(() => {
    if(client.connected)
    {
        clearInterval(t);
        console.time(`${count} hsets`);
        hset(client, count);
        console.timeEnd(`${count} hsets`);
 
        console.time(`${count} hgets`);
        hget(client, count);
        console.timeEnd(`${count} hgets`);

        client.quit();
    
    }
}, 0);


client.on('error', err => 
{
    console.log('error: ' + err);
});

client.on('connect',()=>
{
    console.log('Connection accepted');
});

client.on('end', () => 
{
    console.log('End');
});


function hset(client, count) 
{
    for (let n = 0; n < count; n++) 
    {
        client.hset(n, n, JSON.stringify({id: n, val: `value - ${n}`}));
    }
}

function hget(client, count) {
    for (let n = 0; n < count; n++) 
    {
        client.hget(n, n);
    }
}
