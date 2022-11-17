import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { permission } from 'src/entities/permission.entity';
import { BaseAbstractRepository } from 'src/modules/base/base.abstract.repository';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository extends BaseAbstractRepository<permission> {
  private _repository: Repository<permission>;

  constructor(
    @InjectRepository(permission)
    repository: Repository<permission>,
  ) {
    super(repository);
    this._repository = repository;
  }
}
