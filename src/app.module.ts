import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import ConfigModule from './config/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/tickets.module';
import { TicketAssignmentsModule } from './ticket-assignments/ticket-assignments.module';
import { ConfigType } from '@nestjs/config';
import { DeliveryModule } from './delivery/delivery.module';
import dbConfig from './config/db.config';

@Module({
    imports: [
        ConfigModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigType<typeof dbConfig>) => {
                return {
                    type: 'mssql',
                    username: config.DB_USERNAME,
                    password: config.DB_PASSWORD,
                    host: config.DB_HOST,
                    port: config.DB_PORT,
                    database: config.DB_NAME,
                    synchronize: true,
                    entities: [__dirname + '/**/*.model{.ts,.js}'],
                    options: { trustServerCertificate: true },
                    autoLoadEntities: true,
                };
            },
            inject: [dbConfig.KEY],
        }),
        UserModule,
        TicketsModule,
        TicketAssignmentsModule,
        DeliveryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
