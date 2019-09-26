import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { LoggerMiddleware } from './middlewares/logger';
import { ConfigModule, ConfigService } from './config';

import { SettingsModule } from './modules/settings';
import { TransactionModule } from './modules/transaction';
import { CronModule } from './cron';
import { DocumentModule } from './modules/document';

@Module({
  imports: [
    ConfigModule,
    CronModule,
    DocumentModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    SettingsModule,
    TransactionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
