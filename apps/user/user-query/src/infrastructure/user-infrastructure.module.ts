import { UserEntity, UserMapper, UserSchema } from '@common/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserQueryRepository } from './user-query.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  providers: [UserQueryRepository, UserMapper],
  exports: [UserQueryRepository],
})
export class UserInfrastructureModule {}
