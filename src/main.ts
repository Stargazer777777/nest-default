import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from './utils/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/interceptors/responseInterceptor';
import { HttpFilter } from '@/filters/httpFilter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局pipe
  app.useGlobalPipes(new ValidationPipe());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局异常拦截器
  app.useGlobalFilters(new HttpFilter());

  await app.listen(config.server.port);
}
bootstrap();
