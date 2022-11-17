import { IBaseEntity } from 'src/modules/base/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role extends IBaseEntity {
  @Column()
  name: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @ManyToMany(() => permission, {
    cascade: true,
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permisstions: permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
