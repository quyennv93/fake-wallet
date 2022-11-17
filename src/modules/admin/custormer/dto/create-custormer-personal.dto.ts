import { CustomerType } from 'src/enums/custormer.enum';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCustormerPersonalDto {
  type: CustomerType.PERSONAL;

  @IsNotEmpty({ message: ' khong de trong' })
  @ApiProperty({ example: '123456' })
  password: string;

  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @ApiProperty({
    example: 'Nguyễn Văn A',
  })
  fullName: string;

  @ApiProperty({
    type: Date,
    example: '2020-11-08T14:53:49.004Z',
  })
  birthDay: Date;

  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @ApiProperty({
    example: '0912223445',
  })
  phoneNumber: string;

  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @ApiProperty({
    example: '123456789',
  })
  identityNumber: string;

  @ApiProperty({
    type: Date,
    example: '2015-11-08T14:53:49.004Z',
  })
  dateOfIdentityIssuance: Date;

  @ApiProperty({
    example: 'CA Thành Phố Cà Mau',
  })
  placeOfIdentityIssuance: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Không được để trống',
  })
  @ApiProperty({
    example: 'customer@gmail.com',
  })
  email: string;

  address: string;
  village: string;
  district: string;
  province: string;

  @IsOptional()
  @ApiProperty({
    example: '0988222666',
  })
  referralCode: string;
}
