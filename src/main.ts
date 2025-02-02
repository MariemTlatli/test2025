import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initGlobalConfig } from './startup/global.config';
import { initSecurityConfig } from './startup/security.config';
import { initSwaggerConfig } from './startup/swagger.cofig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  initGlobalConfig(app);

  initSecurityConfig(app);

  initSwaggerConfig(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
