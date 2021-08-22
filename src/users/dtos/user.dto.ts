import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  public id: number;

  @Expose()
  public email: string;
}
