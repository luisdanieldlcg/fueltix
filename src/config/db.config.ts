import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        DB_PORT: parseInt(process.env.DB_PORT),
        DB_HOST: process.env.DB_HOST,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DB_LOGS: process.env.DB_LOGS,
    };
});
