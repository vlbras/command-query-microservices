import { IsMongoId } from 'class-validator';

export class FindUserDto {
  @IsMongoId()
  public id: string;
}
