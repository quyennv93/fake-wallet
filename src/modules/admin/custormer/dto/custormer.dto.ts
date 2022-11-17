import { Exclude } from 'class-transformer';
import { CustomerType } from 'src/enums/custormer.enum';

export class CustomerDto {
  walletId: number;
  type: CustomerType;
  fullName: string;
  birthDay: string;
  avatar: string;
  phoneNumber: string;
  identityNumber: string;
  dateOfIdentityIssuance: string;
  placeOfIdetityIssuance: string;
  address: string;
  village: string;
  district: string;
  province: number;
  email: string;
  referralCode: string;
  @Exclude()
  needReLogin: string;
  @Exclude()
  changePasswordRequired: string;
  @Exclude()
  changePasswordToken: string;
  status: boolean;
}

export class CustomerDetailDto {
  walletId: number;
  type: CustomerType;
  @Exclude()
  password: string;
  gender: number;
  fullName: string;
  birthDay: string;
  avatar: string;
  phoneNumber: string;
  identityNumber: string;
  dateOfIdentityIssuance: string;
  placeOfIdentityIssuance: string;
  address: string;
  village: string;
  district: string;
  province: number;
  email: string;
  referralCode: string;
  @Exclude()
  needReLogin: string;
  @Exclude()
  changePasswordRequired: string;
  @Exclude()
  changePasswordToken: string;
  status: boolean;
}
