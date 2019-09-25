import { Document } from 'mongoose';

export interface Stock extends Document {
  readonly title: string;
  readonly waybill: {
    prefix: string;
    number: number;
  };
}
