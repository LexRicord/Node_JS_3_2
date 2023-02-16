const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": false,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);

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

client.publish('one', 'message 1');

client.publish('two', 'message 2');

setTimeout(() => 
{
    client.publish('one', 'message 3 from pub-client');
}, 5000);

setTimeout(() => 
{
    client.publish('one', 'message 4 from pub-client');
}, 10000);


setTimeout(() => client.quit(), 15000);
