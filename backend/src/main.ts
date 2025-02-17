import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5000;

    app.enableCors(); // Enable CORS for the frontend

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Art Gallery API')
        .setDescription('API for managing artworks in a virtual gallery')
        .setVersion('1.0')
        .addTag('Artworks')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log(`🚀 Server is running on: http://localhost:${PORT}`);
}
bootstrap();