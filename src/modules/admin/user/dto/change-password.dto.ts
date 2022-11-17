import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  newPassword: string;
}
