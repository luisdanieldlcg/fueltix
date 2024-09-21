import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Startup');

  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe()); // Dto validation

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  logger.log(`Server is running on http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();
