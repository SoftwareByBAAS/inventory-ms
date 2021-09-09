import dotenv from 'dotenv';
dotenv.config();

type EnvironmentVariable = string | undefined;

class Config {
	private MONGODB_URL: EnvironmentVariable;
	private PORT: EnvironmentVariable;

	constructor() {
		this.MONGODB_URL = process.env.MONGODB_URL;
		this.PORT = process.env.PORT;
	}

	getMongoUrl(): string {
		return this.MONGODB_URL as string;
	}
	getPort(): number {
		return Number(this.PORT as string);
	}
}

export default new Config();
