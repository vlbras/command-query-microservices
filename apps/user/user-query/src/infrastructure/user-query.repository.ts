import { AbstractQueryRepository } from '@common/mongodb';
import { UserEntity, UserMapper } from '@common/user';
import { User } from '@core/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserQueryRepository extends AbstractQueryRepository<UserEntity, User, UserMapper> {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userEntity: Model<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(userEntity, userMapper);
  }
}
