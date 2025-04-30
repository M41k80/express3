import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS globalmente
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Express3')
    .setDescription('Documentación de la API para el backend Express3')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  console.log(`Swagger docs available at http://localhost:${process.env.PORT ?? 3000}/api`);
  
}
bootstrap();
  
