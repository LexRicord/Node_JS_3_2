import redis from 'redis';

class RedisClient {
    constructor() {
        this.Client = null;
    }

    async connect({ host, port, password }) {
        this.Client = redis.createClient({ host, port, password });
        await this.Client.connect();
        return this.Client;
    }
}

export default new RedisClient();