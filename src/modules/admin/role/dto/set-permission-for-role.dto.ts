import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPermissionForRoleDto {
  @ApiProperty({
    example: [1, 2],
  })
  @ArrayNotEmpty()
  permissonIds: number[];

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  roleId: number;
}
