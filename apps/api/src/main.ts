import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

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
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // http://localhost:3000/swagger
  // http://localhost:3000/swagger/json
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
