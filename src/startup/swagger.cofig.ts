import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function initSwaggerConfig(app) {
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('MIC Leaderboard API')
    .setDescription('MIC Leaderboard API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', in: 'Header', bearerFormat: 'Bearer' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'production')
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true, // This ensures the Authorization header is sent
      },
    });
}
