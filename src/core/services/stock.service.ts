import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef } from '../schemas';
import { Stock } from '../interfaces';

@Injectable()
export class StockService {}
