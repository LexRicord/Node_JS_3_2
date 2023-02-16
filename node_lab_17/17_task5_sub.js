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

client.on('subscribe', (channel, count) => {
    console.log('subscribe: ', 'channel = ', channel, 'count = ', count);
});
client.on('message', (channel, message) => {
    console.log('sub channel: ' + channel + ': ' + message);
});

client.subscribe('one');

setTimeout(() => {
    client.unsubscribe();
    client.quit();
}, 30000);
