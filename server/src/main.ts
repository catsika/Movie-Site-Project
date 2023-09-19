import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
