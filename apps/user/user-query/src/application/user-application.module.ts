import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FindUserQueryHandler, FindUsersQueryHandler, UserQueryFacade } from './queries';

import { UserInfrastructureModule } from '#user-query/infrastructure/user-infrastructure.module';

@Module({
  imports: [CqrsModule.forRoot(), UserInfrastructureModule],
  providers: [UserQueryFacade, FindUsersQueryHandler, FindUserQueryHandler],
  exports: [UserQueryFacade],
})
export class UserApplicationModule {}
