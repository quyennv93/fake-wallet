import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetRoleForUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
  })
  roleId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: '1',
  })
  userId: number;
}
