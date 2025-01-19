import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from "node:process"
import { ValidationPipe as CustomValidationPipe } from "./commons/pipes/validation.pipe"
import { ValidationPipe } from "@nestjs/common"
import { DtoExposeTransformInterceptor } from "./commons/interceptors/dto-expose-transform.interceptor"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new CustomValidationPipe(),
        new ValidationPipe({
            transform: true
        })
    )

    app.useGlobalInterceptors(
        new DtoExposeTransformInterceptor()
    )

    const config = new DocumentBuilder()
        .setTitle("Voluptuaria")
        .setDescription("Voluptuaria web & mobile API source")
        .setVersion("1.0")
        .build()

      const documentFactory = () => SwaggerModule.createDocument(app, config);
      SwaggerModule.setup("api", app, documentFactory);

    await app.listen(process.env.API_PORT ?? 3000,process.env.API_HOST ?? "127.0.0.1")
}

bootstrap();
