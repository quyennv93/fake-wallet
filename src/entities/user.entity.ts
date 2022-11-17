import { IBaseEntity } from 'src/modules/base/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity()
export class User extends IBaseEntity {
  @Column()
  email: string;
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'forgot_password_token' })
  forgotPasswordToken: string;

  @Column({ default: true })
  active: boolean;
  @BeforeInsert()
  @BeforeUpdate()
  setPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password || this.password, salt);
    return this.password;
  }

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
