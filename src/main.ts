import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce API Doc')
    .setDescription('The E-commerce API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swagger);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          return {
            property: error.property,
            message: error.constraints[Object.keys(error.constraints)[0]],
          };
        });
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation error',
          errors: result,
        });
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
