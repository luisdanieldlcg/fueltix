import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export default ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: Joi.object({
    PORT: Joi.number().required(),
  }),
});
