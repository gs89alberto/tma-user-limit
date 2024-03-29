import * as dotenv from 'dotenv';

dotenv.config();

interface ConfigInterface {
    SERVER_PORT: string;
    NODE_ENV: string;
}

export const config: ConfigInterface = {
    SERVER_PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

