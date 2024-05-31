import { AbstractEntity } from '@common/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserEntity extends AbstractEntity {
  @Prop()
  public email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
