import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Unique } from 'src/common/validators/unique';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @Validate(Unique, [User])
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'jon ddd',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: Role.ADMIN,
  })
  role: Role;
}
