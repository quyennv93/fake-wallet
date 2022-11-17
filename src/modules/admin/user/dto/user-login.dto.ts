import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'admin@gmail.com', type: 'string' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456', type: ' string' })
  password: string;
}
