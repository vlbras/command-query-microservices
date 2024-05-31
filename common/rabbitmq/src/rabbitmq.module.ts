import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMQService } from './rabbitmq.service';

type ConnectionConfig = {
  name: string;
};

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  public static register(configs: ConnectionConfig[]): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.register({
          clients: configs.map(config => ({
            name: config.name,
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rabbitmq:5672'],
              queue: config.name,
            },
          })),
          isGlobal: true,
        }),
      ],
      exports: [ClientsModule],
    };
  }
}
