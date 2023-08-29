import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from 'cors'; // Use the correct import statement

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  // app.use(cors({ origin: 'http://localhost:3000' }));
  // app.useGlobalGuards(new RolesGuard());
  // app.enableCors();
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://oru-ride-polama-frontend-tvuo-l6dasnbmh-anandhan-asahi.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  await app.listen(9000);
}
bootstrap();
