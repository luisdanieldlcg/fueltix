import { Module } from '@nestjs/common';
import Config from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { TicketsModule } from './tickets/tickets.module';

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
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      options: { trustServerCertificate: true },
      autoLoadEntities: true,
      logging: true,
    }),

    UserModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
