// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend only
  const allowedOrigins = [
    'http://localhost:3000', // for local dev
    'https://glorious-manifestation-ministry-owe-ten.vercel.app', // your live frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (curl, Postman)
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies if needed
  });

  // Use Render-provided PORT or fallback to 3001
  const port = process.env.PORT || 3001;
  await app.listen(port);

  // ✅ Proper template literal for logging
  console.log(`🚀 Backend running on port ${port}`);
}

bootstrap();
