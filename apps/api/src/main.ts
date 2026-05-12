import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc, ZodValidationPipe } from 'nestjs-zod';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Enable global validation with Zod
  app.useGlobalPipes(new ZodValidationPipe());

  // Swagger docs
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('todo-app')
    .setDescription('The todos API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://todo-app.com', 'Production server')
    .addBearerAuth()
    .addTag('todos')
    .build();
  const openApiDoc = SwaggerModule.createDocument(app, config);
  const documentFactory = () => cleanupOpenApiDoc(openApiDoc) as OpenAPIObject;
  // http://localhost:3000/swagger
  // http://localhost:3000/swagger/json
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
