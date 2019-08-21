import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

import { CoreModule } from './core';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL')
      }),
      inject: [ConfigService]
    }),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
