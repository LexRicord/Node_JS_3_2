const redis = require("redis");

(async () => {
    const client = redis.createClient({
        host: process.env.REDIS_REMOTE_HOST,
        port: process.env.REDIS_REMOTE_PORT,
        //password: process.env.REDIS_PASSWORD2,
        auth_pass: process.env.AUTH_PASS2,
        logErrors: true,
        legacyMode:true});
    await client.connect();
    const k = "myKey";
    const h = "myHash";
    const f = "fieldName";

    // HGET/HSET work as expected
    client.HSET(h, f, "foo", (_, resp) => { console.log("HSET:", resp) }); // 0
    client.HGET(h, f,        (_, resp) => { console.log("HGET:", resp) }); // foo
    client.HSET(h, f, "foo", (_, resp) => { console.log("hSet:", resp) }); // 0
    client.HGET(h, f,        (_, resp) => { console.log("hGet:", resp) }); // foo
    console.log("v4.HSET:", await client.v4.HSET(h, f, "foo"));            // 0
    console.log("v4.HGET:", await client.v4.HGET(h, f));                   // foo
    console.log("v4.hSet:", await client.v4.hSet(h, f, "foo"));            // 0
    console.log("v4.hGet:", await client.v4.hGet(h, f));                   // foo

    // GET/SET
    client.SET(k, "foo", (_, resp) => { console.log("SET:", resp) }); // OK
    client.GET(k,        (_, resp) => { console.log("GET:", resp) }); // foo
    client.set(k, "foo", (_, resp) => { console.log("set:", resp) }); // OK
    client.get(k,        (_, resp) => { console.log("get:", resp) }); // foo
    console.log("v4.SET:", await client.v4.SET(k, "foo"));            // OK
    console.log("v4.GET:", await client.v4.GET(k));                   // foo
    console.log("v4.set:", await client.v4.set(k, "foo"));            // undefined ???
    console.log("v4.get:", await client.v4.get(k));                   // undefined ???

    // EXPIRE
    client.EXPIRE(k, 30, (_, resp) => { console.log("EXPIRE:", resp) }); // 1
    client.expire(k, 30, (_, resp) => { console.log("expire:", resp) }); // 1
    console.log("v4.EXPIRE:", await client.v4.EXPIRE(k, 30));            // true
    console.log("v4.expire:", await client.v4.expire(k, 30));            // undefined ???

    // TTL
    client.TTL(k, (_, resp) => { console.log("TTL:", resp) }); // 30
    client.ttl(k, (_, resp) => { console.log("ttl:", resp) }); // 30
    console.log("v4.TTL:", await client.v4.TTL(k));            // 30
    console.log("v4.ttl:", await client.v4.ttl(k));            // undefined ???

    // DEL
    client.DEL(k,        (_, resp) => { console.log("DEL:", resp) }); // 1
    client.del(k,        (_, resp) => { console.log("del:", resp) }); // 0
    console.log("v4.DEL:", await client.v4.DEL(k));                   // 0
    console.log("v4.del:", await client.v4.del(k));                   // undefined ???

})();