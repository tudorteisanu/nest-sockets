import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export const setupApiDocs = (app: NestExpressApplication) => {
  const description = `
    API_URL: https://sockets.nanoit.dev
  
    Socket events: 
     - new-call, example payload: { "operator": 22, "card": 23, "existingClient": false }
     - pause-operator, example payload: { "operator": 22 }
     - unpause-operator, example payload: { "operator": 22 }
     - end-call, example payload: { "card": 23 }
  `;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test api')
    .setVersion('1.0')
    .setDescription(description)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
};
