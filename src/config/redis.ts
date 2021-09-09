import { createClient } from 'redis';

class Redis {
	public client: ReturnType<typeof createClient>;

	constructor() {
		this.client = createClient();
		this.client.on('error', err => console.log(err));
	}

	public async connect() {
		await this.client.connect();
		console.log('Redis Client Connected');
	}
	public async disconnect() {
		await this.client.disconnect();
	}
}

export default new Redis();
