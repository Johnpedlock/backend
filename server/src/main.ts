import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Frontend can connect)
  app.enableCors({
    origin: '*',
  });

  // Use Render/Env port OR default 3001
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Backend running on http://localhost:${port}`);
}
bootstrap();
