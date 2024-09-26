import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe as CustomValidationPipe} from "./commons/pipes/validation.pipe";
import { DtoExposeTransformInterceptor } from "./commons/interceptors/dto-expose-transform.interceptor"
import { ValidationPipe } from "@nestjs/common"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new CustomValidationPipe(),
      new ValidationPipe({
        transform: true
      })
  )

  app.useGlobalInterceptors(
      new DtoExposeTransformInterceptor()
  )

  await app.listen(3000);
}
bootstrap();
