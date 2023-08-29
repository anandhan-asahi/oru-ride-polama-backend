import { Mongoose } from 'mongoose';
import { UsersSchema } from './schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Users', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
