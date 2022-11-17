import { IBaseEntity } from 'src/modules/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class permission extends IBaseEntity {
  @Column()
  key: string;

  @Column({ name: 'table_name' })
  tableName: string;
}
