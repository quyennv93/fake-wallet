import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Validate } from 'class-validator';
import { Unique } from 'src/common/validators/unique';
import { User } from 'src/entities/user.entity';

export class UpdateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'empty if not change',
  })
  @Validate(Unique, [User])
  email?: string;

  @ApiProperty({
    example: '123456',
    description: 'empty if not change',
  })
  password?: string;

  @ApiProperty({
    example: 'hod dd',
    description: 'empty if not change',
  })
  name?: string;
}
