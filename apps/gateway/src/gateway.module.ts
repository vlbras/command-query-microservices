import { USER_QUERY_SERVICE } from '@api/user-query';
import { RabbitMQModule } from '@common/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [RabbitMQModule.register([{ name: USER_QUERY_SERVICE }])],
})
export class GatewayModule {}
