import { User } from '@core/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { FindUserDto } from './dto';
import { UserQueryTopics } from './user-query.topics';

export const USER_QUERY_SERVICE = 'user-query-service';

// class User {
//   public id: string;
//   public email: string;
// }

@Injectable()
export class UserQueryTransporter {
  public constructor(
    @Inject(USER_QUERY_SERVICE)
    private readonly broker: ClientProxy,
  ) {}

  public async findOne(payload: FindUserDto): Promise<User> {
    return lastValueFrom(this.broker.send(UserQueryTopics.FindOne, payload));
  }

  public async findMany(): Promise<User[]> {
    return lastValueFrom(this.broker.send(UserQueryTopics.FindMany, {}));
  }
}
