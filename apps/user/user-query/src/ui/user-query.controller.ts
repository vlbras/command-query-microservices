import { FindUserDto, UserQueryTopics } from '@api/user-query';
import { User } from '@core/user';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FindUserQuery, FindUsersQuery, UserQueryFacade } from '#user-query/application/queries';

@Controller()
export class UserQueryController {
  public constructor(private readonly userFacade: UserQueryFacade) {
    setTimeout(async () => {
      const users = await this.findMany();
      console.log(users);
    }, 200);
  }

  @MessagePattern(UserQueryTopics.FindMany)
  public async findMany(): Promise<User[]> {
    const query = new FindUsersQuery();
    return this.userFacade.findMany(query);
  }

  @MessagePattern(UserQueryTopics.FindOne)
  public async findOne(@Payload() payload: FindUserDto): Promise<User> {
    const query = new FindUserQuery(payload);
    return this.userFacade.findOne(query);
  }
}
