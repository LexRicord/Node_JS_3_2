const test = require("blue-tape");
const redis = require("redis");
import {promisify} from "node:util";
import test from "blue-tape";
import RedisStore from '/redis_modules/RedisStoreClass.js';

module.exports.lifecycleTest = async function fullLifeCycleTest(
    store: RedisStore,
    client: any,
    t: test.TestFn
): Promise<void> {
    const P = (f: any) => promisify(f).bind(store)
    let res = await P(store.clear)()

    let sess = {foo: "bar"}
    await P(store.set)("123", sess)

    res = await P(store.get)("123")
    t.same(res, sess, "store.get")

    let ttl = await client.ttl("sess:123")
    t.ok(ttl >= 86399, "check one day ttl")

    ttl = 60
    let expires = new Date(Date.now() + ttl * 1000).toISOString()
    await P(store.set)("456", {cookie: {expires}})
    ttl = await client.ttl("sess:456")
    t.ok(ttl <= 60, "check expires ttl")

    ttl = 90
    let expires2 = new Date(Date.now() + ttl * 1000).toISOString()
    await P(store.touch)("456", {cookie: {expires: expires2}})
    ttl = await client.ttl("sess:456")
    t.ok(ttl > 60, "check expires ttl touch")

    res = await P(store.length)()
    t.equal(res, 2, "stored two keys length")

    res = await P(store.ids)()
    res.sort()
    t.same(res, ["123", "456"], "stored two keys ids")

    res = await P(store.all)()
    res.sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
    t.same(
        res,
        [
            {id: "123", foo: "bar"},
            {id: "456", cookie: {expires}},
        ],
        "stored two keys data"
    )

    await P(store.destroy)("456")
    res = await P(store.length)()
    t.equal(res, 1, "one key remains")

    res = await P(store.clear)()

    res = await P(store.length)()
    t.equal(res, 0, "no keys remain")

    let count = 1000
    await load(store, count)

    res = await P(store.length)()
    t.equal(res, count, "bulk count")

    await P(store.clear)()
    res = await P(store.length)()
    t.equal(res, 0, "bulk clear")

    expires = new Date(Date.now() + ttl * 1000).toISOString() // expires in the future
    res = await P(store.set)("789", {cookie: {expires}})

    res = await P(store.length)()
    t.equal(res, 1, "one key exists (session 789)")

    expires = new Date(Date.now() - ttl * 1000).toISOString() // expires in the past
    await P(store.set)("789", {cookie: {expires}})

    res = await P(store.length)()
    t.equal(res, 0, "no key remains and that includes session 789")
}