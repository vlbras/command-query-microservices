import { RabbitMQService } from '@common/rabbitmq';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserQueryModule } from './user-query.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UserQueryModule);
  const rmqService = app.get(RabbitMQService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice(rmqService.createConnection({ queue: USER_QUERY_SERVICE }));

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();

const USER_QUERY_SERVICE = 'user-query-service';
