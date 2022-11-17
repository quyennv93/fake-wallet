import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: Date.now() })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
