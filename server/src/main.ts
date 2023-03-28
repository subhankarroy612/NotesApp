import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv'
import connectDB from './config/connectDB';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await connectDB()
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
