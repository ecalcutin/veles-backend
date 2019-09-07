import { Injectable } from '@nestjs/common';

@Injectable()
export class CronService {
    constructor() {
        console.log('CRON test.')
    }
}