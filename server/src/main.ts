// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global prefix so all routes start with /api
  app.setGlobalPrefix('api');

  // Enable CORS for frontend
  const allowedOrigins = [
    'http://localhost:3000',
    'https://glorious-manifestation-ministry-owe-ten.vercel.app',
  ];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
