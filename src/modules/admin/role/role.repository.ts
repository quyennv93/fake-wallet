import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { BaseAbstractRepository } from 'src/modules/base/base.abstract.repository';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseAbstractRepository<Role> {
  private _repository: Repository<Role>;

  constructor(
    @InjectRepository(Role)
    repository: Repository<Role>,
  ) {
    super(repository);
    this._repository = repository;
  }
}
