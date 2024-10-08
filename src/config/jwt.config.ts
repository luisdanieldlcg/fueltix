import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
    return {
        JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
        JWT_LIFETIME: parseInt(process.env.JWT_LIFETIME),
    };
});
