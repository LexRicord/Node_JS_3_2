const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);

client.on('ready', () => {
    client.set('incr', 0);
});

client.on('error', err => {
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

let t = setInterval(() => {
    if(client.connected)
    {
        clearInterval(t);
        incrQueries(client);
        decrQueries(client);

        client.quit();
    
    }
}, 0);


function incrQueries(client, ) {
    console.time(`10000 incr`);
    for (let n = 0; n < 10000; n++) 
    {
        client.incr('incr');
    }
    console.timeEnd(`10000 incr`);

    client.get('incr', (err, data) => {
        if (err)
        {
             console.log(err);
        }
        else 
        {
            console.log('after incr: ' + data);
        }
    });
}

function decrQueries(client, count) {
    console.time(`10000 decr`);
    for (let n = 0; n < count; n++) 
    {     
        client.decr('incr');
    }
    console.timeEnd(`10000 decr`);

    client.get('incr', (err, data) => 
    {
        if (err) 
        {
            console.log(err);
        }
        else 
        {
            console.log('after decr: ' + data);
        }
    });
}
