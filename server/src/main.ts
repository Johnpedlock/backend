import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global prefix for all API routes
  app.setGlobalPrefix('api');

  // ✅ Enable CORS for your frontend(s)
  const allowedOrigins = [
    'http://localhost:3000', // local dev
    'https://glorious-manifestation-ministry-owe-ten.vercel.app', // live frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl, Postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
