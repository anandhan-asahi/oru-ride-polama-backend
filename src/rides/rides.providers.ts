import { Mongoose } from 'mongoose';
import { RidesSchema } from './schemas/rides.schema';

export const ridesProviders = [
  {
    provide: 'RIDES_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Rides', RidesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
