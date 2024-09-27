import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import dbConfig from './db.config';
import jwtConfig from './jwt.config';

export default ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [dbConfig, jwtConfig],
    validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
    }),
});
