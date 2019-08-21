import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from './config';


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
