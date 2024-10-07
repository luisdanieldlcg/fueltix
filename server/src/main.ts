import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('Startup');

    const app = await NestFactory.create(AppModule, {});
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe()); // Dto validation

    app.use(cookieParser());

    const config = app.get(ConfigService);
    const port = config.get<number>('PORT');
    logger.log(`Server is running on http://localhost:${port}`);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Fuelix')
        .setDescription('Fueltix API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(port);
}
bootstrap();
