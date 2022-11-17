import { Exclude } from 'class-transformer';

export class UserDetailDto {
  @Exclude()
  password: string;

  email: string;

  fullName: string;

  active: boolean;
}
