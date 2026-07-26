import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API de la boda')
    .setDescription('API REST para RSVPs, anuncios, búsqueda de invitados, libro de firmas y exportaciones de administración.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(config.get('PORT') ?? 4000);
}

bootstrap();
