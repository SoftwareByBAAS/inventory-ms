import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

export type EnvironmentVariable = string | undefined;

class Config {
    private MONGODB_URL: EnvironmentVariable;
    private MONGODB_OPTIONS: ConnectOptions;
    private PORT: EnvironmentVariable;
    private DATE_STRING: EnvironmentVariable;
    private JWT_SECRET: EnvironmentVariable;
    private JWT_EXPIRE: EnvironmentVariable;
    private JWT_REFRESH_EXPIRE: EnvironmentVariable;

    constructor() {
        this.MONGODB_URL = process.env.MONGODB_URL;
        this.MONGODB_OPTIONS = {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        this.PORT = process.env.PORT;
        this.DATE_STRING = process.env.DATE_STRING;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRE = process.env.JWT_EXPIRE;
        this.JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;
    }

    getMongoUrl(): string {
        return this.MONGODB_URL as string;
    }
    getMongoOptions(): ConnectOptions {
        return this.MONGODB_OPTIONS;
    }
    getPort(): number {
        return Number(this.PORT as string);
    }
    getDateString(): string {
        return this.DATE_STRING as string;
    }
    getJwtSecret(): string {
        return this.JWT_SECRET as string;
    }
    getJwtAccessExpire(): string {
        return this.JWT_EXPIRE as string;
    }
    getJwtRefreshExpire(): string {
        return this.JWT_REFRESH_EXPIRE as string;
    }
}

export default new Config();