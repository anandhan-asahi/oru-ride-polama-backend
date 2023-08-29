import { Document } from 'mongoose';

export interface Rides extends Document {
  readonly name: string;
  readonly date: Date;
  readonly price: string;
  readonly imageUrl: string;
}
