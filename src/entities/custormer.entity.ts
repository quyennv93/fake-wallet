import { Exclude } from 'class-transformer';
import { Gender } from 'src/common/constrants';
import { CustomerType } from 'src/enums/custormer.enum';
import { IBaseEntity } from 'src/modules/base/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class Customer extends IBaseEntity {
  @Column()
  type: CustomerType;

  @Column()
  gender: Gender;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'birth_day' })
  birthDay: Date;

  @Column()
  avatar: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'identity_number' })
  identityNUmber: string;

  @Column({ name: 'date_of_identity_issuance' })
  dateOfIdentityIssuance: Date;

  @Column({ name: 'place_of_identity_issuance' })
  placeOfIdentityIssuance: string;

  @Column()
  address: string;

  @Column()
  village: string;

  @Column()
  district: string;

  @Column()
  province: number;

  @Column()
  email: string;

  @Column({ name: 'referral_code' })
  referralCode: string;

  @Column({ name: 'need_re_login' })
  needReLogin: string;

  @Column({ name: 'change_password_required' })
  changePasswordRequired: string;

  @Column({ name: 'change_password_token' })
  changePasswordToken: string;

  @Column({ default: true })
  status: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  setPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password || this.password, salt);
    return this.password;
  }
}
