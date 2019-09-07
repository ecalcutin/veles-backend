import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerMiddleware } from './middlewares/logger';
import { ConfigModule, ConfigService } from './config';

import { SettingsModule } from './modules/settings';
import { BalanceModule } from './modules/balance';
import { CronModule } from './cron';

@Module({
  imports: [
    ConfigModule,
    CronModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL')
      }),
      inject: [ConfigService]
    }),
    SettingsModule,
    BalanceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/')
  }
}
