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
    .setTitle('Wedding API')
    .setDescription('REST API for RSVPs, announcements, guest lookup, guestbook, and admin exports.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(config.get('PORT') ?? 4000);
}

bootstrap();
