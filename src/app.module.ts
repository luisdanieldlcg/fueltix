import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Config from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';

@Module({
  imports: [
    Config,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      username: 'sa',
      password: '@admin123',
      host: 'localhost',
      port: 1433,
      synchronize: true,
      database: 'fuel',
      entities: [User],
      options: { trustServerCertificate: true },
      autoLoadEntities: true,
      logging: true,
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
