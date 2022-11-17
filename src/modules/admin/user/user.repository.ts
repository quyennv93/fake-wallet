import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BaseAbstractRepository } from 'src/modules/base/base.abstract.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  private _repository: Repository<User>;

  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
    this._repository = repository;
  }

  async findActiveByEmail(email: string): Promise<User> {
    return await this._repository.findOne({
      where: {
        email,
        active: true,
      },
    });
  }

  async findActiveById(id: number): Promise<User> {
    return this._repository.findOne({
      where: {
        id: id,
        active: true,
      },
    });
  }

  async countAllUser(): Promise<number> {
    return await this._repository.count();
  }
}
