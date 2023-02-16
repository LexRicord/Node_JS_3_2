const redis = require('redis');
let config = {
    "host": "redis-19367.c265.us-east-1-2.ec2.cloud.redislabs.com",
    "port": 19367,
    "no_ready_check": true,
    "auth_pass": "gbknXBA17HhvrjNJrTfmVrT9XVPYz8uV"
  }
const client = redis.createClient(config);


client.on('connect',()=>
{
    console.log('Connection accepted');
});

client.on('ready', () => 
{
    console.log('Ready command');
});

client.on('error', (err) => 
{
    console.log('Error: ' + err);
});

client.on('warning', () => 
{
    console.log('Warning');
});

client.on('end', () => 
{
    console.log('End');
});

client.quit();

