import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entities/custormer.entity';
import { BaseAbstractRepository } from 'src/modules/base/base.abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CustomerRepository extends BaseAbstractRepository<Customer> {
  private _repository: Repository<Customer>;

  constructor(
    @InjectRepository(Customer)
    repository: Repository<Customer>,
  ) {
    super(repository);
    this._repository = repository;
  }

  findByPhone(phone: string): Promise<Customer> {
    return this._repository.findOne({
      where: {
        phoneNumber: phone,
      },
    });
  }
}
