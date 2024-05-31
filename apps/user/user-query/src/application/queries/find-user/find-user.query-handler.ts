import { User } from '@core/user';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUserQuery } from './find-user.query';

import { UserQueryRepository } from '#user-query/infrastructure/user-query.repository';

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery, User> {
  public constructor(private readonly userRepository: UserQueryRepository) {}

  public async execute(query: FindUserQuery): Promise<User> {
    const { id } = query.data;
    return this.userRepository.findOneOrFail({ _id: id });
  }
}
