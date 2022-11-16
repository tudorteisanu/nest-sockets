import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { setupApiDocs } from './config/swagger';
import { setupGlobalValidation } from './config/validation';
import { ValidationExceptionFilter } from './error-handler';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });
  app.setBaseViewsDir(join(__dirname, 'templates'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, 'templates/partials'));
  setupApiDocs(app);
  setupGlobalValidation(app);
  app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3000);
}

bootstrap();
