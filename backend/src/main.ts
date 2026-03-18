import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');
  
  app.enableCors({
    origin: allowedOrigins === '*' ? true : (allowedOrigins?.split(',') || ['http://localhost:3000']),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = configService.get<string>('PORT') || 3001;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces
  console.log(`Backend running on port ${port}`);
}
bootstrap();
