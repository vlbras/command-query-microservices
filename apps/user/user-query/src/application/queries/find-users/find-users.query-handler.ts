import { User } from '@core/user';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUsersQuery } from './find-users.query';

import { UserQueryRepository } from '#user-query/infrastructure/user-query.repository';

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler<FindUsersQuery, User[]> {
  public constructor(private readonly userRepository: UserQueryRepository) {}

  public async execute(query: FindUsersQuery): Promise<User[]> {
    return this.userRepository.findMany(query);
  }
}
