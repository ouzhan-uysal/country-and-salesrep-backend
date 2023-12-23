import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  if (!PORT) {
    Logger.error('.env file not found! Please obtain the file from your developer.');
  }

  await app.listen(PORT);
  Logger.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
