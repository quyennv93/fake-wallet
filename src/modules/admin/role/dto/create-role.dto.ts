import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'user',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user',
  })
  @IsNotEmpty()
  displayName: string;
}
