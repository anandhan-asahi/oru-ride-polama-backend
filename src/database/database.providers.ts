import * as mongoose from 'mongoose';
const username = encodeURIComponent('anand-guna');
const password = encodeURIComponent('Asahi@123');

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `mongodb+srv://${username}:${password}@cluster0.umwc1dm.mongodb.net/sample-db?retryWrites=true&w=majority`,
      ),
  },
];
