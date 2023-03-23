const express = require("express");
const app = express();
const redis = require("redis");
const router = express.Router();
require("dotenv").config();
const session = require("express-session");
const test_module = require("D:\\repos\\Node_JS_3_2\\node_lab_17\\redis_modules\\keyGetSet.js");
const test = require("blue-tape");

const RedisStore = require("connect-redis");

const Redis = new redis.createClient({
    host: toString(process.env.REDIS_REMOTE_HOST),
    port: process.env.REDIS_REMOTE_PORT,
    //password: process.env.REDIS_PASSWORD2,
    auth_pass: process.env.AUTH_PASS2,
    logErrors: true,
});

const redisStore = RedisStore(session);
const redis_Store = new redisStore({
    client: Redis,
});

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        store: new redisStore({
            host: process.env.REDIS_REMOTE_HOST,
            port: process.env.REDIS_REMOTE_PORT,
            //password: process.env.REDIS_PASSWORD2,
            auth_pass: process.env.AUTH_PASS2,
            logErrors: true,
        }),
    })
);
app.use(router);
router.get("/", (req, res, next) => {
    if (!req.session.userid) {
        req.session.userid = req.query.userid;
        console.log("Userid is set");
        req.session.loadedCount = 0;
    } else {
        req.session.loadedCount = Number(req.session.loadedCount) + 1;
    }
    res.send(
        'userid: ${req.session.userid}, loadedCount:${req.session.loadedCount}'
    );
});

app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`node-redis version is ${require('redis/package.json').version}`);
    console.log(`Server ready on port ${process.env.SERVER_PORT}`);
    test_module.keyGetSet_test().then(function (result){
    console.log("Test out: ["+result+"]")
    });
    test("redis", async (t) => {
        let clientTest = redis.createClient({url: process.env.REDIS_URL})
        await clientTest.connect()
        let store = new RedisStore({clientTest})
        await test.lifecycleTest(store, clientTest, t)
        await clientTest.disconnect()
    })
});

Redis.on('connect', function() {
    console.log('Connected!'); // Connected!
});