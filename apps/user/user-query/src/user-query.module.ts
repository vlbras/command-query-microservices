import { RabbitMQModule } from '@common/rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserApplicationModule } from './application/user-application.module';
import { UserQueryController } from './ui/user-query.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/engl-rush'), RabbitMQModule, UserApplicationModule],
  controllers: [UserQueryController],
})
export class UserQueryModule {}
